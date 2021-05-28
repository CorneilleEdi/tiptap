import { FirebaseService } from "../../common/services/firebase.service";
import { QAService } from "../../common/services/qa.service";
import {
    GET_ANSWERS_BY_CURRENT_USER,
    GET_QUESTIONS_BY_CURRENT_USER
} from "../types/actions.type";
import {
    SET_CURRENT_USER_ANSWERS,
    SET_CURRENT_USER_QUESTIONS
} from "../types/mutations.type";

const state = {
    userQuestions: [],
    userAnswers: [],
};

const getters = {
    userQuestions: (state) => state.userQuestions,
    userAnswers: (state) => state.userAnswers,
};

const actions = {
    [GET_QUESTIONS_BY_CURRENT_USER]: async ({ commit }) => {
        if (FirebaseService.getCurrentUser()) {
            // eslint-disable-next-line no-unused-vars
            const questions = await QAService.getQuestionsByUser(
                FirebaseService.getCurrentUser().uid
            );
            commit(SET_CURRENT_USER_QUESTIONS, { questions });
        }
    },
    [GET_ANSWERS_BY_CURRENT_USER]: async ({ commit }) => {
        if (FirebaseService.getCurrentUser()) {
            // eslint-disable-next-line no-unused-vars
            const answers = await QAService.getAnswersByUser(
                FirebaseService.getCurrentUser().uid
            );
            commit(SET_CURRENT_USER_ANSWERS, { answers });
        }
    },
};

const mutations = {
    [SET_CURRENT_USER_ANSWERS](state, { answers }) {
        state.userAnswers = answers;
    },
    [SET_CURRENT_USER_QUESTIONS](state, { questions }) {
        state.userQuestions = questions;
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
};
