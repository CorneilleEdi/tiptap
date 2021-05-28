import ApiService from "./api.service";
const QUESTIONS_PATH = "/questions";
const ANSWERS_PATH = "/answers";
export const QAService = {
    async getQuestionsByUser(uid) {
        const res = await ApiService.get(`${QUESTIONS_PATH}/users/${uid}`, {});
        return res?.data?.data;
    },
    async getAnswersByUser(uid) {
        const res = await ApiService.get(`${ANSWERS_PATH}/users/${uid}`, {});
        return res?.data?.data;
    },

    async searchQuestions(key) {
        const res = await ApiService.get(`${QUESTIONS_PATH}/search`, { key });
        return res?.data?.data;
    },

    async getQuestion(uid) {
        const res = await ApiService.get(`${QUESTIONS_PATH}/${uid}/full`, {});
        return res?.data?.data;
    },

    async createQuestion(data) {
        const res = await ApiService.post(`${QUESTIONS_PATH}`, data);
        return res?.data?.data;
    },

    async updateQuestion(uid, data) {
        const res = await ApiService.patch(`${QUESTIONS_PATH}/${uid}`, data);
        return res?.data?.data;
    },

    async deleteQuestion(uid) {
        const res = await ApiService.delete(`${QUESTIONS_PATH}/${uid}`);
        return res?.data?.data;
    },

    async getAnswer(questionUid) {
        const res = await ApiService.get(
            `${QUESTIONS_PATH}/${questionUid}/answers`,
            {}
        );
        return res?.data?.data;
    },

    async createAnswer(questionUid, data) {
        const res = await ApiService.post(
            `${QUESTIONS_PATH}/${questionUid}/answers`,
            data
        );
        return res?.data?.data;
    },

    async updateAnswer(questionUid, answerUid, data) {
        const res = await ApiService.patch(
            `${QUESTIONS_PATH}/${questionUid}/answers/${answerUid}`,
            data
        );
        return res?.data?.data;
    },

    async deleteAnswer(questionUid, answerUid) {
        const res = await ApiService.delete(
            `${QUESTIONS_PATH}/${questionUid}/answers/${answerUid}`
        );
        return res?.data?.data;
    },
};
