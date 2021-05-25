import { CollectionReference, Firestore } from '@google-cloud/firestore';
import { PartialDeep } from 'type-fest';
import { Inject, Injectable } from '@nestjs/common';
import { FirestoreService } from '../../../shared/libs/gcp/firestore';
import { FirestoreDocumentNotFoundException } from '../../../shared/libs/gcp/firestore/firestore.exception';
import { FirestoreCollections } from '../../../shared/utils/constants/firestore.constant';
import { GCP_FIRESTORE } from '../../../shared/utils/constants/providers.constant';
import { IFirestoreUser, IUser } from './models/user-profile.interface';
import { UserProfileMapper } from './models/user-profile.mapper';

@Injectable()
export class UsersProfileRepository {
    private readonly usersCollection: CollectionReference;
    constructor(
        private readonly firestoreService: FirestoreService,
        @Inject(GCP_FIRESTORE) private readonly firestore: Firestore,
    ) {
        this.usersCollection = this.firestore.collection(FirestoreCollections.USERS);
    }

    async getUser(id: string, safe = true): Promise<IUser> | null {
        const snapshot = await this.usersCollection.doc(id).get();

        if (!snapshot.exists) {
            if (safe) {
                return null;
            } else {
                throw new FirestoreDocumentNotFoundException(id);
            }
        }

        return UserProfileMapper.fromFirebaseDataToData({ ...snapshot.data() } as IFirestoreUser);
    }

    async createUser(userUid: string, data: PartialDeep<IUser>) {
        await this.usersCollection
            .doc(userUid)
            .set(
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

        await this.usersCollection
            .doc(userUid)
            .set({
                ...user,
                ...UserProfileMapper.fromDataToFirebaseData({
                    uid: userUid,
                    ...data,
                    updatedAt: Date.now(),
                }),
            });

        return await this.getUser(userUid);
    }
}
