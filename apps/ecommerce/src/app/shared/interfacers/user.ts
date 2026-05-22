export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User_Profile;
}

export interface User_Profile {
  _id: string;
  name: string;
  email: string;
  role: string;
  authProvider: string;
  avatar: string;
  active: boolean;
  phone: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileAddress {
  city: string;
  address: string;
}

export interface CreatedProfileAddress extends ProfileAddress {
  _id?: string;
}

export interface ProfileAddressesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  // support multiple backend shapes:
  // - data: { addresses: [ ... ] }
  // - data: ProfileAddress[]
  // - data: ProfileAddress
  data: { addresses: ProfileAddress[] } | ProfileAddress[] | ProfileAddress;
}

export interface ProfileAddressResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    address: CreatedProfileAddress;
  };
}

export interface Address {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  phoneNumber: string;
}