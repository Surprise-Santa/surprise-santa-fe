import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
    password: Yup.string().trim().required("A New password is required"),
    confirmPassword: Yup.string()
        .trim()
        .required("You must confirm your new password!")
        .test("passwords-match", "Password must be the same as the new password", function (value) {
            const password = this.parent.password;
            return value === password;
        }),
});

export const signInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().trim().required("Password is required"),
});

export const signUpSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("First name is required"),
    lastName: Yup.string().trim().required("Last name is required"),
    middleName: Yup.string().trim(),
    gender: Yup.string().trim().required("Gender is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().trim(),
    password: Yup.string().trim().required("A New password is required"),
    confirmPassword: Yup.string()
        .trim()
        .required("You must confirm your new password!")
        .test("passwords-match", "Password must be the same as the new password", function (value) {
            const password = this.parent.password;
            return value === password;
        }),
});

export const editProfileSchema = Yup.object({
    firstName: Yup.string().trim().notRequired(),
    lastName: Yup.string().trim().notRequired(),
    middleName: Yup.string().trim().notRequired(),
    gender: Yup.string().trim().notRequired(),
    phone: Yup.string().trim().notRequired(),
});

export const updatePasswordSchema = Yup.object({
    currentPassword: Yup.string().trim().required("Your current password is required"),
    newPassword: Yup.string().trim().required("You must confirm your new password!"),
});

export const createEventSchema = Yup.object().shape({
    title: Yup.string().trim().required("Event title is required"),
    description: Yup.string().trim().required("Event description is required"),
    startDate: Yup.string().required("Event start date is required"),
    endDate: Yup.string().required("Event end date is required"),
    groupId: Yup.string().trim().required("Event group is required"),
});

export const createGroupSchema = Yup.object().shape({
    name: Yup.string().trim().required("Group name is required"),
    description: Yup.string().trim().required("Group description is required"),
});
export const inviteMemberSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
});
