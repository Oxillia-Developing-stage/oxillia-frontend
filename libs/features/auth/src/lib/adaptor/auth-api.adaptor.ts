import { Injectable } from '@angular/core';
import { Adaptor, AuthAdapted, AuthApiAdaptor } from '../interfaces/adaptor';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptorService implements Adaptor {
  adapt(data: AuthAdapted): AuthApiAdaptor {
    return {
      message: data.message,
      token: data.data.accessToken,
      id: data.data.user.id,
      name: data.data.user.name,
      email: data.data.user.email,
      role: data.data.user.role,
    };
  }
}