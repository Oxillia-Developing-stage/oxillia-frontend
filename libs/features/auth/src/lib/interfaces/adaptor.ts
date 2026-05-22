export interface AuthAdapted {
  message: string;
  success: boolean;
  statusCode: number;
  data: {
    accessToken: string;
    user:{
   id: string;
   name: string;
   email: string;
   role:string;
    }
  };
}

export interface AuthApiAdaptor {
message: string;
token: string;
id: string;
name: string;
email: string;
role: string;
}

export interface Adaptor {
  adapt(data: AuthAdapted): AuthApiAdaptor;
}
