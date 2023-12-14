export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const urls = {
    signUpUrl: `${baseUrl}/auth/signup`,
    loginUrl: `${baseUrl}/auth/login`,
    googleLoginUrl: `${baseUrl}/auth/login/social-auth`,
    forgotPasswordUrl: `${baseUrl}/auth/request-password-reset`,
    resetPasswordUrl: (token: string) => `${baseUrl}/auth/password-reset?token=${token}`,
    getAllEventsUrl: `${baseUrl}/events`,
    getEventByIdUrl: (id: string) => `${baseUrl}/events/${id}`,
    createEventUrl: `${baseUrl}/events/create`,
    createGroupsUrl: `${baseUrl}/groups/create`,
    getAllGroupsUrl: `${baseUrl}/groups/my-groups`,
    getOwnGroupsUrl: `${baseUrl}/groups/own-groups`,
    getGroupByIdUrl: (id: string) => `${baseUrl}/groups/${id}`,
    inviteGroupMembesrUrl: (id: string) => `${baseUrl}/groups/${id}/email-invite`,
    getMatchUrl: (id: string) => `${baseUrl}/events/${id}/get-match`,
};
