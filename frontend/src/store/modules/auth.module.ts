import { authService } from "@/shared/services/api/auth.service";
import { firebaseService } from "@/shared/services/firebase/firebase.service";
import store from "@/store";
import { Action, getModule, Module, VuexModule } from "vuex-module-decorators";
import modulesNames from "../modules-name";

@Module({ dynamic: true, namespaced: true, store, name: modulesNames.auth })
class AuthModule extends VuexModule {
    @Action({ rawError: true })
    async authWithGoogle(): Promise<boolean> {
        try {
            const result = await firebaseService.loginWithGoogle();
            try {
                const res = await authService.auth({
                    email: result.user?.email ?? "",
                    phoneNumber: result.user?.phoneNumber || null,
                    profileImage: result.user?.photoURL ?? "",
                    name: result.user?.displayName ?? "",
                });

                return res.new;
            } catch (e) {
                await firebaseService.logout();
                throw e;
            }
        } catch (e) {
            await firebaseService.logout();
            throw e;
        }
    }

    @Action({ rawError: true })
    async logout(): Promise<void> {
        return await firebaseService.logout();
    }
}

export default getModule(AuthModule);
