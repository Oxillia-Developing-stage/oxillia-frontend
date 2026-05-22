import { InjectionToken } from '@angular/core';

export const BaseUrl = new InjectionToken<string>('BaseUrl', {
  providedIn: 'root',
  factory: () => 'https://oxxila-api-01ced6342147.herokuapp.com/api/v1',
});
