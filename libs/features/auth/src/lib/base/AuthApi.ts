import { Observable } from "rxjs";
import * as authData from "../interfaces/auth-data";
import { AuthApiAdaptor, AuthAdapted } from "../interfaces/adaptor";
export abstract class AuthApi {
    abstract login(data:authData.loginData):Observable<AuthApiAdaptor>;
    abstract register(data:authData.registerData):Observable<AuthApiAdaptor>;
    abstract forgotPassword(data:authData.forgetPasswordPasswordData):Observable<number>;
    abstract resetPassword(data:authData.resetPasswordData):Observable<AuthApiAdaptor>;
    abstract refreshToken(data:authData.refreshTokenData):Observable<AuthApiAdaptor>;


    //later on 
    abstract deleteMe(data:any):Observable<any>;
    abstract editProfile(data:any):Observable<any>;
    abstract changePassword(data:any):Observable<any>;
    abstract logout(data:any):Observable<any>;
    abstract getUserInfo():Observable<any>;
}