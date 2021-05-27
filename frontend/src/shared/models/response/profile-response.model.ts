export interface IUserProfileAuthenticationInfoResponseModel {
    lastLogin: number;
    email: string;
    phoneNumber: string;
}

export interface IUserProfileResponseModel {
    uid: string;
    name: string;
    about: string;
    profileImage: string;
    questions: string[];
    answers: string[];
    createdAt: number;
    updatedAt: number;
    authenticationInfo: IUserProfileAuthenticationInfoResponseModel;
}
