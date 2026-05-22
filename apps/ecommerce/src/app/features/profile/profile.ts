import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, ArrowLeft, Plus } from 'lucide-angular';
import { ProfileService, UpdateMePayload, UserProfile } from './profile.service';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { AddressModalComponent } from './components/address-modal/address-modal.component';
import { ProfileAddress, CreatedProfileAddress, User_Profile } from '../../shared/interfacers/user';
import { ToasterService } from '../../shared/components/toaster/toaster-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    AvatarUploadComponent,
    AddressModalComponent,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  profileForm!: FormGroup;
  profileData = signal<UserProfile | null>(null);
  addresses = signal<CreatedProfileAddress[]>([]);
  isAddressModalOpen = false;

  editingAddress = signal<CreatedProfileAddress | null>(null);

  user = signal<User_Profile | null>(null);
  readonly ArrowLeftIcon = ArrowLeft;
  readonly PlusIcon = Plus;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadProfile();
  }

  initForm() {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  loadProfile() {
    this.profileService.getProfile().subscribe((profileResponse) => {
      this.user.set(profileResponse.data);

      this.profileData.set({
        fullName: profileResponse.data.name,
        avatarUrl: profileResponse.data.avatar,
        city: '',
        address: '',
        phoneNumber: profileResponse.data.phone,
        addresses: [],
      });

      this.profileForm.patchValue({
        fullName: profileResponse.data.name,
        phoneNumber: profileResponse.data.phone,
      });

      this.refreshAddresses();
    });
  }
  private refreshAddresses() {
    this.profileService.getAddresses().subscribe({
      next: (addressesResponse) => {
        const payload = addressesResponse?.data;

        // backend returns { data: { addresses: [ { city, address, _id }, ... ] } }
        let addressesArray: ProfileAddress[] = [];
        const maybe = payload as { [k: string]: unknown } | undefined;

        if (Array.isArray(payload)) {
          addressesArray = payload as ProfileAddress[];
        } else if (maybe && Array.isArray(maybe['addresses'])) {
          addressesArray = (maybe['addresses'] as unknown) as ProfileAddress[];
        } else if (maybe && Array.isArray(maybe['address'])) {
          addressesArray = (maybe['address'] as unknown) as ProfileAddress[];
        } else if (maybe && (typeof maybe['city'] === 'string' || typeof maybe['address'] === 'string')) {
          addressesArray = [
            {
              city: (maybe['city'] as string) ?? '',
              address: (maybe['address'] as string) ?? '',
            },
          ];
        }

        const addressesList = addressesArray.map((item) => ({
          _id: (item as any)?._id ?? (item as any)?.id ?? undefined,
          city: item?.city ?? '',
          address: item?.address ?? '',
        }));

        // update addresses signal (preserve _id when present)
        this.addresses.set(addressesList as CreatedProfileAddress[]);

        const firstAddress = addressesList[0];

        // update profileData signal with primary address
        this.profileData.update((pd) => {
          if (!pd) return pd;
          return {
            ...pd,
            city: firstAddress?.city ?? '',
            address: firstAddress?.address ?? '',
            addresses: addressesList,
          };
        });
      },
      error: () => {
        // on error, set empty addresses silently (no console in SSR)
        this.addresses.set([]);
        this.profileData.update((pd) => pd ? { ...pd, addresses: [] } : pd);
      },
    });
  }

  onAvatarSelected(file: File) {
    this.profileService.updateMyAvatar(file).subscribe((response) => {
      this.user.set(response.data);
      this.profileData.update((pd) => pd ? { ...pd, avatarUrl: response.data.avatar } : pd);
    });
  }

  openAddressModal() {
    if (!this.profileForm.get('phoneNumber')?.value?.trim()) {
      this.toasterService.showError('Save your phone number first before adding an address.');
      return;
    }

    // clear editing state when adding
    this.editingAddress.set(null);
    this.isAddressModalOpen = true;
  }

  closeAddressModal() {
    this.isAddressModalOpen = false;
    this.editingAddress.set(null);
  }

  onSaveAddress(address: ProfileAddress | (ProfileAddress & { _id?: string })) {
    const payload: any = address as any;

    // if the payload contains an _id, treat this as an update
    if (payload && payload._id) {
      const addressId = payload._id as string;
      this.profileService.updateAddress(addressId, { city: payload.city, address: payload.address }).subscribe({
        next: () => this.refreshAddresses(),
        error: (error) => this.toasterService.showError(error?.error?.message ?? 'Unable to update address right now.'),
      });
      return;
    }

    // otherwise create a new address
    this.profileService.addAddress(payload).subscribe({
      next: (response) => {
        const savedAddress = response?.data?.address as any;
        if (savedAddress) {
          this.addresses.update((list) => [
            ...list,
            { _id: savedAddress._id ?? undefined, city: savedAddress.city ?? '', address: savedAddress.address ?? '' },
          ]);

          this.profileData.update((pd) => pd ? ({
            ...pd,
            city: savedAddress.city ?? pd.city,
            address: savedAddress.address ?? pd.address,
            addresses: [...(pd.addresses ?? []), { _id: savedAddress._id ?? undefined, city: savedAddress.city ?? '', address: savedAddress.address ?? '' }],
          }) : pd);
        }

        this.refreshAddresses();
      },
      error: (error) => {
        const message = error?.error?.message ?? 'Unable to add address right now.';
        this.toasterService.showError(message);
      },
    });
  }

  onEditAddress(addr: CreatedProfileAddress) {
    this.editingAddress.set(addr);
    this.isAddressModalOpen = true;
  }

  onDeleteAddress(addr: CreatedProfileAddress) {
    const id = (addr as any)._id ?? (addr as any).id;
    if (!id) {
      this.toasterService.showError('Unable to delete this address (missing id).');
      return;
    }

    this.profileService.deleteAddress(id).subscribe({
      next: () => this.refreshAddresses(),
      error: (error) => this.toasterService.showError(error?.error?.message ?? 'Unable to delete address right now.'),
    });
  }

  onSaveProfile() {
    if (this.profileForm.valid && this.profileData()) {
      const currentUser = this.user();
      if (!currentUser?.email || !currentUser?.name) {
        this.toasterService.showError('Unable to save profile right now. Please reload and try again.');
        return;
      }

      const payload: UpdateMePayload = {
        name: currentUser.name,
        email: currentUser.email,
        phone: this.profileForm.get('phoneNumber')?.value,
      };

      this.profileService.updateMe(payload).subscribe({
        next: (response) => {
          this.user.set(response.data);

          this.profileData.update((pd) => ({
            ...(pd ?? {
              fullName: '',
              avatarUrl: '',
              city: '',
              address: '',
              phoneNumber: '',
              addresses: [],
            }),
            fullName: response.data.name,
            avatarUrl: response.data.avatar,
            phoneNumber: response.data.phone,
          }));

          this.profileForm.patchValue({
            fullName: response.data.name,
            phoneNumber: response.data.phone,
          });

          this.toasterService.showsuccess('Profile saved successfully!');
        },
        error: (error) => {
          const message = error?.error?.message ?? 'Unable to update profile right now.';
          this.toasterService.showError(message);
        },
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
