export interface ResetPasswordType {
    password: string;
    confirmPassword: string;
}

export interface SignInType {
    email: string;
    password: string;
}

export interface SignUpType {
    firstName: string;
    lastName: string;
    middleName?: string;
    gender: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword?: string;
    profileImgUrl?: string;
}

export interface SignUpWithGoogleType {
    accessToken: string;
    gender: string;
    password: string;
    phone?: string;
}
