export interface registerData {
  name: string;
  email: string;
  password: string;
}
export interface loginData {
  email: string;
  password: string;
}
export interface forgetPasswordPasswordData {
  email: string;
}

export interface resetPasswordData {
   token: string;
  newPassword: string;
  email: string;
}
export interface refreshTokenData {
  email: string;
}