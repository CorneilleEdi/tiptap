import { ProfileService } from "../../common/services/profile.service";
import {
    GET_CURRENT_USER
} from "../types/actions.type";
import {
    SET_PROFILE
} from "../types/mutations.type";

const state = {
    user: {},
};

const getters = {
    user: (state) => state.user,
    name: (state) => state.user.name,
    about: (state) => state.user.about,
    createdAt: (state) => state.user.createdAt,
};

const actions = {
    // Auth
    // eslint-disable-next-line no-unused-vars
    [GET_CURRENT_USER]: async ({ commit },) => {
        // eslint-disable-next-line no-unused-vars

        const user = await ProfileService.getCurrentUserProfile();

        commit(SET_PROFILE, { user });


    },
}

const mutations = {

    [SET_PROFILE](state, { user }) {
        state.user = user;
    },
}

export default {
    state,
    actions,
    mutations,
    getters,
};