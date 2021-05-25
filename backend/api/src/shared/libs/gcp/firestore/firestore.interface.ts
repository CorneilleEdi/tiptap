import { Timestamp } from '@google-cloud/firestore';

export interface IFirebaseDocument {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}
