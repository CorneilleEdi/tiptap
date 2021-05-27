import { IUserProfileResponseModel } from "@/shared/models/response/profile-response.model";
import { profileService } from "@/shared/services/api/profile.service";
import { firebaseService } from "@/shared/services/firebase/firebase.service";
import store from "@/store";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { userProfileMapper } from "../mappers/profile.mapper";
import { IUserProfile } from "../models/profile.model";
import modulesNames from "../modules-name";
import IUserProfileState from "../states/profile.state";

@Module({ dynamic: true, namespaced: true, store, name: modulesNames.profile })
class ProfileModule extends VuexModule implements IUserProfileState {
    loading = false;
    loadingError: boolean | null = null;

    userProfile: IUserProfile | null | undefined = null;
    userProfileResponse: IUserProfileResponseModel | null | undefined = null;

    get uid(): string | undefined {
        return firebaseService.getCurrentUser()?.uid;
    }

    get name(): string {
        return this.userProfile?.name ?? "";
    }

    get about() {
        return this.userProfile?.about ?? "";
    }

    get phoneNumber(): string {
        return this.userProfile?.authenticationInfo.phoneNumber ?? "";
    }

    get email(): string {
        return this.userProfile?.authenticationInfo.email ?? "";
    }

    get profileImage() {
        return this.userProfile?.profileImage ?? "";
    }

    @Mutation
    private SET_LOADING(loading: boolean) {
        this.loading = loading;
    }

    @Mutation
    private SET_LOADING_ERROR(error: boolean | null) {
        this.loadingError = error;
    }

    @Mutation
    private SET_USER_PROFILE(userProfile: IUserProfile) {
        this.userProfile = userProfile;
    }

    @Mutation
    private SET_USER_PROFILE_RESPONSE(userProfileResponse: IUserProfileResponseModel) {
        this.userProfileResponse = userProfileResponse;
    }

    @Action({ rawError: true })
    async fetchUserProfile() {
        if (firebaseService.getCurrentUser()) {
            this.SET_LOADING(true);
            this.SET_LOADING_ERROR(null);

            try {
                const response = await profileService.getCurrentUserProfile();

                this.SET_USER_PROFILE_RESPONSE(response);
                this.SET_USER_PROFILE(
                    userProfileMapper.mapIUserProfileResponseModelToIUserProfile(response),
                );
            } catch (error) {
                this.SET_LOADING_ERROR(true);
                throw error;
            }
        }
    }
}

export default getModule(ProfileModule);
