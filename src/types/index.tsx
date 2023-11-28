export interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

export interface SignInFormValues {
    email: string;
    password: string;
}

export interface SignUpFormValues {
    firstName: string;
    lastName: string;
    middleName?: string;
    gender: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}
