/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Timestamp } from '@google-cloud/firestore';
import { PartialDeep } from 'type-fest';
import { IFirestoreUser, IUser } from './user-profile.interface';

export class UserProfileMapper {
    static fromFirebaseDataToData(data: IFirestoreUser): IUser {
        return {
            uid: data.uid,
            name: data.name,
            about: data.about,
            profileImage: data.profileImage,
            questions: data.questions,
            answers: data.answers,
            createdAt: data.createdAt ? data.createdAt.toDate().toLocaleString() : '',
            updatedAt: data.updatedAt ? data.updatedAt.toDate().toLocaleString() : '',
            authenticationInfo: {
                lastLogin: data.authenticationInfo.lastLogin
                    ? data.authenticationInfo.lastLogin.toDate().toLocaleString()
                    : '',
                email: data.authenticationInfo.email,
                phoneNumber: data.authenticationInfo.phoneNumber,
            },
        };
    }

    static fromDataToFirebaseData(data: PartialDeep<IUser>): IFirestoreUser {
        return {
            uid: data.uid,
            name: data.name || '',
            about: data.about || '',
            profileImage: data.profileImage || '',
            questions: data.questions || [],
            answers: data.answers || [],
            createdAt: data.createdAt ? Timestamp.fromMillis(data.createdAt! as number) : null,
            updatedAt: data.updatedAt ? Timestamp.fromMillis(data.updatedAt! as number) : null,
            authenticationInfo: {
                lastLogin: data.authenticationInfo.lastLogin
                    ? Timestamp.fromMillis(data.authenticationInfo!.lastLogin! as number)
                    : null,
                email: data.authenticationInfo.email || '',
                phoneNumber: data.authenticationInfo.phoneNumber || '',
            },
        };
    }
}
