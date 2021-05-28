import ApiService from "./api.service";
const PROFILE_PATH = "/users/profile";
export const ProfileService = {
    async getCurrentUserProfile() {
        const res = await ApiService.get(PROFILE_PATH, {});
        return res?.data?.data;
    },

    async getUserProfile(uid) {
        const res = await ApiService.get(`${PROFILE_PATH}/${uid}`, {});
        return res?.data?.data;
    },

    async updateCurrentUserProfile(data) {
        const res = await ApiService.patch(`${PROFILE_PATH}`, data);
        return res?.data?.data;
    },

    async changeProfileImage(data) {
        const res = await ApiService.patch(`${PROFILE_PATH}/image`, data);
        return res?.data?.data;
    },

    async deleteProfileImage() {
        const res = await ApiService.delete(`${PROFILE_PATH}/image`);
        return res?.data?.data;
    },
};
