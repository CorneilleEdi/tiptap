import { AppConfig } from "@/shared/config/app.config";
import Vue from "vue";
import Vuex, { createLogger } from "vuex";

Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RootState { }

export default new Vuex.Store<RootState>({
  plugins: AppConfig.ENVIRONMENT == "dev" ? [createLogger()] : [],
});
