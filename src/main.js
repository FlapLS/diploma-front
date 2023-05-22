import {createApp} from 'vue'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import router from "@/plugins/router";
import store from './store'


import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';

loadFonts()


const app = createApp(App)
app.use(store);
app.use(router)
app.use(vuetify)

app.use(VueFusionCharts,FusionCharts);
app.mount('#app')
