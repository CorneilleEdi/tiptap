export class AppConfig {
    static API_URL = process.env.VUE_APP_BASE_API_URL;
    static ENVIRONMENT = process.env.VUE_APP_APP_NAME ?? "";
}
