export interface EditProfileType {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    gender?: string;
    phone?: string;
}

export interface UpdatePasswordType {
    currentPassword: string;
    newPassword: string;
}
