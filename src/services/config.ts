export const configOptions = () => {
    if (typeof window === "undefined") return true;

    if (!window.sessionStorage.getItem("user")) return false;

    const accessToken = JSON.parse(window.sessionStorage.getItem("user") as string).token;

    if (!!accessToken) {
        return accessToken;
    }
};
