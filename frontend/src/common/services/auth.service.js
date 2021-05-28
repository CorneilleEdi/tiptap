import ApiService from "./api.service";
const HttpStatus = require('http-status');


const AUTH_PATH = "/users/auth";


export const AuthService = {
    async auth(data) {
        const res = await ApiService.post(AUTH_PATH, data);

        return {
            data: res?.data?.data,
            new: res.status === HttpStatus.CREATED ? true : false,
        };
    },
};
