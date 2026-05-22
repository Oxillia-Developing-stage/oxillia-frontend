export class AuthEndPoint {
  static readonly REGISTER = 'auth/register';
  static readonly LOGIN = 'auth/login';
  static readonly REFRESH = 'auth/refresh';
  static readonly FORGOT_PASSWORD = 'auth/forgot-password';
  static readonly RESET_PASSWORD = 'auth/reset-password';
  static readonly LOGOUT = 'auth/logout';
  static readonly GOOGLE = 'auth/google';

  static readonly USERINFO = 'users/getMe';
  static readonly DELETEMYACCOUNT = 'auth/deleteMe';
  static readonly EDITPROFILE = 'auth/editProfile';
  static readonly CHANGE_PASSWORD = 'auth/changePassword';
}
