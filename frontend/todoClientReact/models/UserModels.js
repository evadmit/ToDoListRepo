export class User {
    id;
    name;
    email;
    password;
}

export class UserLoginResponse {
    _id;
    email;
    password;
}
export class UserProfileModel{
    _id;
    email;
    name;
    password;
    todos;
}

export class RegisterUser {
    name;
    email;
    password;
    confirmPassword;
}

export class LoginResponseModel {
    user;
    token;
}

export class GoogleLoginRequestModel{
    email;
    name;
    password;
}
export class RegisterRequestModel {
    name;
    email;
    password;
}
export class RegisterResponseModel {
    user;
    token;
}
