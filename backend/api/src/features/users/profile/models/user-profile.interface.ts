import { Timestamp } from '@google-cloud/firestore';

export interface IFirestoreUserAuthenticationInfo {
    email: string;
    phoneNumber: string;
    lastLogin: Timestamp;
}

export interface IFirestoreUser {
    // DocumentID
    uid?: string;
    name: string;
    about: string;
    profileImage: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    authenticationInfo: IFirestoreUserAuthenticationInfo;
    questions: string[];
    answers: string[];
}

export interface IUserAuthenticationInfo {
    email: string;
    phoneNumber: string;
    lastLogin: number | string;
}

export interface IUser {
    // DocumentID
    uid: string;
    name: string;
    about: string;
    profileImage: string;
    createdAt: number | string;
    updatedAt: number | string;
    authenticationInfo: IUserAuthenticationInfo;
    questions: string[];
    answers: string[];
}
