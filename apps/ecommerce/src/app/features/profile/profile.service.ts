import { Injectable } from '@angular/core';
import { BaseUrl } from 'libs/features/auth/src/lib/enums/authEndPointsToken';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  ProfileAddress,
  CreatedProfileAddress,
  ProfileAddressResponse,
  ProfileAddressesResponse,
  ProfileResponse,
} from '../../shared/interfacers/user';

export interface UpdateMePayload {
  name: string;
  email: string;
  phone: string;
}

export interface UserProfile {
  fullName: string;
  avatarUrl: string;
  city: string;
  address: string;
  phoneNumber: string;
  addresses: CreatedProfileAddress[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  _HttpClient = inject(HttpClient);
  _url_token = inject(BaseUrl); 
  private mockProfile: UserProfile = {
    fullName: 'Muhamed Emad',
    avatarUrl: 'https://i.pravatar.cc/150?img=11', // Placeholder avatar
    city: 'Your City',
    address: 'Enter full address',
    phoneNumber: 'Your Number',
    addresses: [
      {
        city: 'Hawaii',
        address: '1901 Thornridge Cir. Shiloh, Hawaii 81063'
      }
    ]
  };


  getProfile(): Observable<ProfileResponse> {
   return this._HttpClient.get<ProfileResponse>(`${this._url_token}/users/getMe`);
  }

  getAddresses(): Observable<ProfileAddressesResponse> {
    return this._HttpClient.get<ProfileAddressesResponse>(
      `${this._url_token}/users/profile/addresses`
    );
  }

  updateMyAvatar(avatar: File): Observable<ProfileResponse> {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return this._HttpClient.patch<ProfileResponse>(
      `${this._url_token}/users/updateMyAvatar`,
      formData
    );
  }

  addAddress(address: ProfileAddress): Observable<ProfileAddressResponse> {
    return this._HttpClient.post<ProfileAddressResponse>(
      `${this._url_token}/users/profile/addresses`,
      address
    );
  }

  updateAddress(addressId: string, address: ProfileAddress): Observable<ProfileAddressResponse> {
    return this._HttpClient.patch<ProfileAddressResponse>(
      `${this._url_token}/users/profile/addresses/${addressId}`,
      address
    );
  }

  deleteAddress(addressId: string): Observable<ProfileAddressesResponse> {
    return this._HttpClient.delete<ProfileAddressesResponse>(
      `${this._url_token}/users/profile/addresses/${addressId}`
    );
  }

  updateMe(payload: UpdateMePayload): Observable<ProfileResponse> {
    return this._HttpClient.patch<ProfileResponse>(
      `${this._url_token}/users/updateMe`,
      payload
    );
  }

  updateProfile(profileData: Partial<UserProfile>): Observable<UserProfile> {
    this.mockProfile = { ...this.mockProfile, ...profileData };
    return of(this.mockProfile).pipe(delay(300));
  }
}
