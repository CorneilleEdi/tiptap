import { CollectionReference, Firestore } from '@google-cloud/firestore';
import { PartialDeep } from 'type-fest';
import { Inject, Injectable } from '@nestjs/common';
import { Collections } from '../../../shared/utils/constants/collections-names.constant';
import { GCP_FIRESTORE } from '../../../shared/utils/constants/providers.constant';
import { IFirestoreUser, IUser } from './models/user-profile.interface';
import { UserProfileMapper } from './models/user-profile.mapper';
import { UserNotFoundException } from './users.exception';

@Injectable()
export class UsersProfileRepository {
    private readonly usersCollection: CollectionReference;
    constructor(@Inject(GCP_FIRESTORE) private readonly firestore: Firestore) {
        this.usersCollection = this.firestore.collection(Collections.USERS);
    }

    async getUser(id: string, safe = true): Promise<IUser> | null {
        const snapshot = await this.usersCollection.doc(id).get();

        if (!snapshot.exists) {
            if (safe) {
                return null;
            } else {
                throw new UserNotFoundException(id);
            }
        }

        return UserProfileMapper.fromFirebaseDataToData({ ...snapshot.data() } as IFirestoreUser);
    }

    async createUser(userUid: string, data: PartialDeep<IUser>) {
        await this.usersCollection.doc(userUid).set(
            UserProfileMapper.fromDataToFirebaseData({
                uid: userUid,
                ...data,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }),
        );

        return await this.getUser(userUid);
    }

    async updateUser(userUid: string, data: PartialDeep<IUser>) {
        const user = await this.getUser(userUid);
        await this.usersCollection.doc(userUid).set({
            ...UserProfileMapper.fromDataToFirebaseData({
                uid: userUid,
                ...user,
                ...data,
                updatedAt: Date.now(),
            }),
        });

        return await this.getUser(userUid);
    }
}
