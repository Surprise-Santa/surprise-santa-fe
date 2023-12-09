export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const urls = {
    signUpUrl: `${baseUrl}/auth/signup`,
    loginUrl: `${baseUrl}/auth/login`,
    googleLoginUrl: `${baseUrl}/auth/login/social-auth`,
    forgotPasswordUrl: `${baseUrl}/auth/request-password-reset`,
    resetPasswordUrl: (token: string) => `${baseUrl}/auth/password-reset?token=${token}`,
    getAllEventsUrl: `${baseUrl}/event`,
    getEventByIdUrl: (id: string) => `${baseUrl}/event/${id}`,
    getAllGroupsUrl: `${baseUrl}/group/my-groups`,
    createEventUrl: `${baseUrl}/event/create`,
};
