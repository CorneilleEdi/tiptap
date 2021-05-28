import firebase from "firebase/app";
import { eventBus } from "../../main";
import { auth } from "../firebase";

export const FirebaseService = {
    async loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return await auth.signInWithPopup(provider);
    },
    async logout() {
        try {
            eventBus.$emit("showLoading");
            await auth.signOut();
            eventBus.$emit("hideLoading");
        } catch (e) {
            eventBus.$emit("hideLoading");
        }
    },
    getCurrentUser() {
        let user = auth.currentUser;
        if (user) {
            const { uid, email } = user;
            return { uid, email };
        }
        return user;
    },
    async getIdToken() {
        if (auth.currentUser) {
            return await auth.currentUser.getIdToken(true);
        }
        return null;
    },
};
