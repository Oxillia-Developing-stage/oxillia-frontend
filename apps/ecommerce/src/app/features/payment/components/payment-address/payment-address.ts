import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ShippingCountry, ShippingDistrict, ShippingGovernorate, ShippingService } from '../../shipping.service';

export interface PaymentAddressValue {
  countryId: string;
  governorateId: string;
  districtId: string;
  addressLine: string;
  phoneNumber: string;
  countryName?: string;
  governorateName?: string;
  districtName?: string;
}

@Component({
  selector: 'app-payment-address',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './payment-address.html',
  styleUrl: './payment-address.scss',
})
export class PaymentAddressComponent implements OnInit {
  private readonly shippingService = inject(ShippingService);

  @Input() phoneNumber = '20 123 456 7890';
  @Output() addressChange = new EventEmitter<PaymentAddressValue>();
  @Output() shippingResolved = new EventEmitter<number>();

  readonly countries = signal<ShippingCountry[]>([]);
  readonly governorates = signal<ShippingGovernorate[]>([]);
  readonly districts = signal<ShippingDistrict[]>([]);

  selectedCountryId = '';
  selectedGovernorateId = '';
  selectedDistrictId = '';
  addressLine = '';

  ngOnInit(): void {
    this.loadCountries();
  }

  private loadCountries(): void {
    this.shippingService.getCountries().subscribe({
      next: (response) => {
        const countries = response.data ?? [];
        this.countries.set(countries);
        this.selectedCountryId = countries[0]?._id ?? '';
        if (this.selectedCountryId) {
          this.loadGovernorates(this.selectedCountryId);
        }
      },
      error: () => {
        this.countries.set([]);
      },
    });
  }

  onCountryChange(): void {
    this.selectedGovernorateId = '';
    this.selectedDistrictId = '';
    this.districts.set([]);

    if (this.selectedCountryId) {
      this.loadGovernorates(this.selectedCountryId);
    }

    this.emitChange();
  }

  onGovernorateChange(): void {
    this.selectedDistrictId = '';
    this.districts.set([]);

    if (this.selectedGovernorateId) {
      this.loadDistricts(this.selectedGovernorateId);
    }

    this.emitChange();
  }

  onDistrictChange(): void {
    this.emitChange();
  }

  onAddressChange(): void {
    this.emitChange();
  }

  resetAddress(): void {
    this.selectedGovernorateId = '';
    this.selectedDistrictId = '';
    this.addressLine = '';
    this.districts.set([]);
    this.emitChange();
  }

  private loadGovernorates(countryId: string): void {
    this.shippingService.getGovernorates(countryId).subscribe({
      next: (response) => {
        const governorates = response.data ?? [];
        this.governorates.set(governorates);
        this.selectedGovernorateId = governorates[0]?._id ?? '';
        if (this.selectedGovernorateId) {
          this.loadDistricts(this.selectedGovernorateId);
        }
        this.emitChange();
      },
      error: () => this.governorates.set([]),
    });
  }

  private loadDistricts(governorateId: string): void {
    this.shippingService.getZones(governorateId).subscribe({
      next: (response) => {
        const zones = response.data;
        const districts = zones?.districts ?? [];
        const otherDistrict = zones?.other
          ? { _id: 'other', name: zones.other.label, shippingPrice: zones.other.shippingPrice, isOther: true }
          : { _id: 'other', name: 'Other', isOther: true };

        this.districts.set([...districts, otherDistrict]);
        this.selectedDistrictId = this.districts()[0]?._id ?? '';
        this.emitChange();
      },
      error: () => this.districts.set([]),
    });
  }


  private emitChange(): void {
    const governorate = this.governorates().find((item) => item._id === this.selectedGovernorateId);
    const district = this.districts().find((item) => item._id === this.selectedDistrictId);

    const payload: PaymentAddressValue = {
      countryId: this.selectedCountryId,
      governorateId: this.selectedGovernorateId,
      districtId: this.selectedDistrictId,
      addressLine: this.addressLine,
      phoneNumber: this.phoneNumber,
      countryName: this.countries().find((item) => item._id === this.selectedCountryId)?.name,
      governorateName: governorate?.name,
      districtName: district?.name,
    };

    this.addressChange.emit(payload);

    if (this.selectedGovernorateId && this.selectedDistrictId) {
      this.shippingService.resolveShippingPrice(this.selectedGovernorateId, this.selectedDistrictId).subscribe({
        next: (response) => this.shippingResolved.emit(response.data?.shippingPrice ?? 0),
        error: () => this.shippingResolved.emit(0),
      });
    } else {
      this.shippingResolved.emit(0);
    }
  }
}