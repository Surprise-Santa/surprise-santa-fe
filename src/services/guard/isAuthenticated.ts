export async function isAuthenticated() {
    if (typeof window === "undefined") return true;

    const accessToken = JSON.parse(window.sessionStorage.getItem("user") as string)?.token;

    return !!accessToken;
}
