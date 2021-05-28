import { AuthService } from "../../common/services/auth.service";
import { FirebaseService } from "../../common/services/firebase.service";
import { eventBus } from "../../main";
import {
    LOGIN_WITH_GOOGLE, LOGOUT
} from "../types/actions.type";
import {
    SET_ERROR,
    SET_PROFILE
} from "../types/mutations.type";

const state = {
    errors: null,
    isAuthenticated: false,
};

const getters = {
    isAuthenticated: () => FirebaseService.getCurrentUser() ? true : false,
    error: (state) => state.error,

};

const actions = {
    // Auth
    // eslint-disable-next-line no-unused-vars
    [LOGIN_WITH_GOOGLE]: async ({ commit },) => {
        // eslint-disable-next-line no-unused-vars

        try {
            const result = await FirebaseService.loginWithGoogle();
            try {
                const res = await AuthService.auth({
                    email: result.user?.email ?? "",
                    phoneNumber: result.user?.phoneNumber || null,
                    profileImage: result.user?.photoURL ?? "",
                    name: result.user?.displayName ?? "",
                });

                return res.new;
            } catch (e) {
                await FirebaseService.logout();
                throw e;
            }
        } catch (e) {
            await FirebaseService.logout();
            throw e;
        }
    },

    [LOGOUT]: async ({ commit },) => {
        // eslint-disable-next-line no-unused-vars

        await FirebaseService.logout();
        commit(SET_PROFILE, {});


    },
}

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
        eventBus.$emit("showSnackbar", {
            text: `Error: ${state.errors}`,
        });
    },
    [SET_PROFILE](state, { user }) {
        state.user = user;
        state.isAuthenticated = false;
    },

}

export default {
    state,
    actions,
    mutations,
    getters,
};