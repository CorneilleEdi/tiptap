import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    dark: false,
    themes: {
        light: {
            primary: {
                base: '#4608ad',
                lighten1: '#f0ebf9',
                darken1: '#32067c',
                darken2: '#150233'
            },
            accent: '#2196f3',
            secondary: '#fafafa',
            anchor: '#2196f3'
        }
    }
});
