
import { IUserProfileResponseModel } from "@/shared/models/response/profile-response.model";
import { AxiosInstance } from "axios";
import ApiInstance from "./api.service";

export default class ProfileService {
    private readonly PROFILE_PATH = "/users/profile";
    constructor(private api: Readonly<AxiosInstance>) { }

    async getCurrentUserProfile(): Promise<IUserProfileResponseModel> {
        const res = await this.api.get(`${this.PROFILE_PATH}`);

        return res?.data?.data as IUserProfileResponseModel;
    }

    async getUserProfile(uid: string): Promise<IUserProfileResponseModel> {
        const res = await this.api.get(`${this.PROFILE_PATH}/${uid}`);

        return res?.data?.data as IUserProfileResponseModel;
    }
}

export const profileService = new ProfileService(ApiInstance);
