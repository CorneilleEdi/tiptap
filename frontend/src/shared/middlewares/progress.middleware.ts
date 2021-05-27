const NProgress = require("nprogress");

// Turn off loading spinner
NProgress.configure({ showSpinner: false });

export class ProgressLoader {
    static show() {
        NProgress.start();
    }

    static hide() {
        NProgress.done(true);
    }
}
