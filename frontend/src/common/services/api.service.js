import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import { API_URL } from "../config";
import { hideLoading, showLoading } from "../middlewares/progress.middleware";
import { FirebaseService } from "./firebase.service";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
        Vue.axios.interceptors.request.use(
            (config) => {
                showLoading();
                return config;
            },
            (error) => {
                hideLoading();
                return Promise.reject(error);
            },
        );

        Vue.axios.interceptors.response.use(
            (response) => {
                hideLoading();
                return response;
            },
            (error) => {
                hideLoading();
                return Promise.reject(error);
            },
        );
    },

    async setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${await FirebaseService.getIdToken()}`;
    },

    async query(resource, params) {
        await this.setHeader();
        return Vue.axios.get(resource, params).catch((error) => {
            return Promise.reject(error);
        });
    },

    async get(resource) {
        await this.setHeader();
        return Vue.axios.get(`${resource}/`).catch((error) => {
            return Promise.reject(error);
        });
    },

    async post(resource, params) {
        await this.setHeader();
        return Vue.axios.post(`${resource}`, params).catch((error) => {
            return Promise.reject(error);
        });
    },
    async patch(resource, params) {
        await this.setHeader();
        return Vue.axios.patch(`${resource}`, params).catch((error) => {
            return Promise.reject(error);
        });
    },

    async delete(resource) {
        await this.setHeader();
        return Vue.axios.delete(resource).catch((error) => {
            return Promise.reject(error);
        });
    },
};

export default ApiService;