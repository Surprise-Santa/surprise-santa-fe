import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const axios = Axios.create({
    baseURL: process.env.NEXT_APP_PUBLIC_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

const axiosConfiguration = (config: AxiosRequestConfig) => {
    const token = JSON.parse(sessionStorage.getItem("user") || "{}").token;
    if (token)
        config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`,
        };

    return config;
};

axios.interceptors.request.use(axiosConfiguration as any);

axios.interceptors.response.use(
    (res: any) => {
        return res;
    },
    async (error: any) => {
        if (
            error instanceof AxiosError &&
            error.response?.status === 401 &&
            error.response?.data?.message === "Unauthorized"
        ) {
            toast.error(
                `${error.response?.data?.message}. Please login to continue` || error.message,
            );

            window.location.href = "/";

            return;
        }
        if (error instanceof AxiosError && error.response?.status === 400) {
            toast.error(error.response?.data?.message || error.message);
            return Promise.reject(error.response);
        }
        toast.error(error.response?.data?.message || error.message);
        return Promise.reject(error);
    },
);

export default axios;
