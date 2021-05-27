
import { NotificationsUtil } from "@/shared/utils/notifications.util";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AppConfig } from "../../config/app.config";
import { ProgressLoader } from "../../middlewares/progress.middleware";
import { firebaseService } from "../firebase/firebase.service";

const AuthInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    ProgressLoader.show();
    const token = await firebaseService.getIdToken();
    if (token) config.headers.Authorization = `Token ${token}`;
    return config;
};

const OnResponseSuccess = (response: AxiosResponse<any>): AxiosResponse<any> => {
    ProgressLoader.hide();
    return response;
};

const OnResponseFailure = (error: any): Promise<any> => {
    ProgressLoader.hide();
    const httpStatus = error?.response?.status;

    const errors = error?.response?.data?.message;
    const isUnknownError = errors ? false : true;

    if (AppConfig.ENVIRONMENT === "dev") {
        NotificationsUtil.showError({
            title: "Error",
            message: isUnknownError ? "Unknown Error" : errors,
        });
    }

    return Promise.reject(error);
};

const instance: Readonly<AxiosInstance> = axios.create({
    baseURL: AppConfig.API_URL,
    timeout: 20000,
});

instance.defaults.headers.get.Accepts = "application/json";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
instance.defaults.headers.common["x-api-client"] = "web";

instance.interceptors.request.use(AuthInterceptor);

instance.interceptors.response.use(OnResponseSuccess, OnResponseFailure);

export default instance;
