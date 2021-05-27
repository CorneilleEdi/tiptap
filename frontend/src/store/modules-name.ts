interface IModulesNames {
    profile: string;
    auth: string;
}

const modulesNames: Readonly<IModulesNames> = {
    auth: "auth",
    profile: "profile",
};

export default modulesNames;
