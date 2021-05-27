export interface IRoutesNames {
    authentication: string;
    profile: string;
    questions: string;
}

const routesNames: Readonly<IRoutesNames> = {
    authentication: "authentication",
    profile: "profile",
    questions: "questions",
};

declare module "vue/types/vue" {
    interface Vue {
        $routesNames: IRoutesNames;
    }
}

export default routesNames;
