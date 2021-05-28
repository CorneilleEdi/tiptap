import NProgress from "nprogress";

// Turn off loading spinner
NProgress.configure({ showSpinner: false });

export const showLoading = () => NProgress.start();
export const hideLoading = () => NProgress.done();