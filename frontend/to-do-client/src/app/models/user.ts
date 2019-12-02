export class User {
    id: number;
    name: string;
    email: string;
    password:string;
}

export class UserLoginResponse {
    _id: number;
    email: string;
    password:string;
}
export class UserProfileModel{
    _id: number;
    email: string;
    name: string;
    password:string;
    todos: Array<object>;
}
export class LoginResponseModel {
    user: UserLoginResponse;
    token: string;
}

export class GoogleLoginRequestModel{
    email: string;
    name: string;
    password: string;
}
export class RegisterRequestModel {
    name: string;
    email: string;
    password:string;
}
export class RegisterResponseModel {
    user: UserProfileModel;
    token: string;
}
