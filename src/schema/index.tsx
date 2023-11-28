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
    phoneNumber: Yup.string().trim().required("Phone number is required"),
    password: Yup.string().trim().required("A New password is required"),
    confirmPassword: Yup.string()
        .trim()
        .required("You must confirm your new password!")
        .test("passwords-match", "Password must be the same as the new password", function (value) {
            const password = this.parent.password;
            return value === password;
        }),
});
