export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const urls = {
    signUpUrl: `${baseUrl}/auth/signup`,
    loginUrl: `${baseUrl}/auth/login`,
    getAllEventsUrl: `${baseUrl}/event`,
    getEventByIdUrl: (id: string) => `${baseUrl}/event/${id}`,
    getAllGroupsUrl: `${baseUrl}/group/my-groups`,
    createEventUrl: `${baseUrl}/event/create`,
};
