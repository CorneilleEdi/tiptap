export interface IUserProfileAuthenticationInfo {
    lastLogin: number;
    email: string;
    phoneNumber: string;
}

export interface IUserProfile {
    uid: string;
    name: string;
    about: string;
    profileImage: string;
    questions: string[];
    answers: string[];
    numberOfQuestions: number;
    numberOfAnswers: number;
    createdAt: number;
    updatedAt: number;
    authenticationInfo: IUserProfileAuthenticationInfo;
}
