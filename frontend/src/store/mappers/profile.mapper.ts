import {
    IUserProfileAuthenticationInfoResponseModel,
    IUserProfileResponseModel
} from "@/shared/models/response/profile-response.model";
import { IUserProfile, IUserProfileAuthenticationInfo } from "../models/profile.model";

export default class UserProfileMapper {
    public mapIUserProfileResponseModelToIUserProfile(
        userProfileResponseModel: IUserProfileResponseModel,
    ): IUserProfile {
        return {
            uid: userProfileResponseModel.uid,
            name: userProfileResponseModel.name,
            about: userProfileResponseModel.about,
            profileImage: userProfileResponseModel.profileImage,
            questions: userProfileResponseModel.questions,
            answers: userProfileResponseModel.questions,
            numberOfQuestions: userProfileResponseModel.questions.length,
            numberOfAnswers: userProfileResponseModel.answers.length,
            createdAt: userProfileResponseModel.createdAt,
            updatedAt: userProfileResponseModel.createdAt,
            authenticationInfo:
                this.mapIUserProfileAuthenticationInfoResponseModelToIUserProfileAuthenticationInfo(
                    userProfileResponseModel.authenticationInfo,
                ),
        };
    }

    private mapIUserProfileAuthenticationInfoResponseModelToIUserProfileAuthenticationInfo(
        userProfileAuthenticationInfoResponseModel: IUserProfileAuthenticationInfoResponseModel,
    ): IUserProfileAuthenticationInfo {
        return {
            lastLogin: userProfileAuthenticationInfoResponseModel.lastLogin,
            email: userProfileAuthenticationInfoResponseModel.email,
            phoneNumber: userProfileAuthenticationInfoResponseModel.phoneNumber,
        };
    }
}

export const userProfileMapper = new UserProfileMapper();
