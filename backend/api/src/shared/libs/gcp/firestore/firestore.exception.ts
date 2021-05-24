export class FirestoreDocumentNotFoundException extends Error {
    constructor(id?: string) {
        super(`firestore document ${id} not found`)
    }
}
export class FirestoreDocumentsCollectionEmptyException extends Error {
    constructor(ref) {
        super(`firestore collection ${ref} is empty`)
    }
}