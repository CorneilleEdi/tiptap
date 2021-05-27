import firebase from "firebase/app";
import { auth } from "../../config/firebase.config";

export default class FirebaseService {
    async signInWithCustomToken(token: string): Promise<firebase.auth.UserCredential> {
        return await auth.signInWithCustomToken(token);
    }

    async logout(): Promise<void> {
        return await auth.signOut();
    }

    async loginWithGoogle(): Promise<firebase.auth.UserCredential> {
        const provider = new firebase.auth.GoogleAuthProvider();
        return await auth.signInWithPopup(provider);
    }

    getCurrentUser(): {
        uid: string;
        email: string | null;
    } | null {
        const user = auth.currentUser;
        if (user) {
            const { uid, email } = user;
            return { uid, email };
        }
        return user;
    }

    async getIdToken(): Promise<string | null> {
        if (auth.currentUser) {
            return await auth.currentUser.getIdToken(true);
        }
        return null;
    }
}

export const firebaseService = new FirebaseService();
