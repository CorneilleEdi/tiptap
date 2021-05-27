import { AxiosInstance } from "axios";
import { IAuthRequestParamsModel } from "../../models/request/auth-request.model";
import HttpStatusCodes from "../../utils/http-status-code";
import ApiInstance from "./api.service";

export default class AuthService {
    private readonly AUTH_PATH = "/users/auth";
    constructor(private api: Readonly<AxiosInstance>) { }

    async auth(params: IAuthRequestParamsModel): Promise<{
        data: any;
        new: boolean;
    }> {
        const res = await this.api.post(`${this.AUTH_PATH}`, params);

        return {
            data: res?.data?.data,
            new: res.status === HttpStatusCodes.CREATED ? true : false,
        };
    }
}

export const authService = new AuthService(ApiInstance);