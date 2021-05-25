import { CollectionReference, DocumentData, Firestore } from '@google-cloud/firestore';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { GCP_FIRESTORE } from '../../../utils/constants/providers.constant';
import {
    FirestoreDocumentNotFoundException,
    FirestoreDocumentsCollectionEmptyException,
} from './firestore.exception';

export interface IFirestoreDocument {
    id: string;
    data: any;
}

@Injectable()
export class FirestoreService {
    private readonly logger: Logger = new Logger(this.constructor.name);

    constructor(@Inject(GCP_FIRESTORE) private firestore: Firestore) {}

    /**
     * getReference
     * @name getReference
     * @description get reference. It can also be use for more advance query
     * @param collection collection reference
     * @returns  {CollectionReference<DocumentData>}
     */
    getReference(collection: string): CollectionReference<DocumentData> {
        return this.firestore.collection(collection);
    }

    async getById(collection: string, id: string, safe = true): Promise<IFirestoreDocument> {
        const ref = this.getReference(collection);

        const snapshot = await ref.doc(id).get();

        if (!snapshot.exists) {
            if (safe) {
                return null;
            } else {
                throw new FirestoreDocumentNotFoundException(id);
            }
        }
        return { id: snapshot.id, data: snapshot.data() };
    }

    async find(collection: string, safe = true): Promise<IFirestoreDocument[]> {
        const ref = this.getReference(collection);

        const snapshot = await ref.get();

        if (!snapshot.empty) {
            if (safe) {
                return [];
            } else {
                throw new FirestoreDocumentsCollectionEmptyException(collection);
            }
        } else {
            return snapshot.docs.map((doc) => {
                return { id: doc.id, data: doc.data() };
            });
        }
    }

    async add(collection: string, data: any, id: string = null): Promise<IFirestoreDocument> {
        const ref = this.getReference(collection);

        const snapshot = await ref.add(data);

        return { id: snapshot.id, data };
    }

    async update(
        collection: string,
        id: string,
        data: any,
        clean = true,
    ): Promise<IFirestoreDocument> {
        const ref = this.getReference(collection);

        const snapshot = await this.getById(collection, id);

        if (clean) Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

        await ref.doc(id).set({ ...snapshot.data(), ...data });

        return {
            id,
            data: {
                ...snapshot.data(),
                ...data,
            },
        };
    }

    async delete(collection: string, id: string): Promise<IFirestoreDocument> {
        const ref = this.getReference(collection);
        const snapshot = await this.getById(collection, id);

        await ref.doc(id).delete();

        return { id: snapshot.id, data: snapshot.data() };
    }
}
