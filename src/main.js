import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store";
import Buefy from "buefy";
import axios from "axios";
import "buefy/dist/buefy.css";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import moment from "moment";
// Vue.prototype.$moment = moment; //赋值使用
// moment.locale("zh-cn"); //中文

Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

new Vue({
    router,
    store,
    axios,
    render: h => h(App)
}).$mount("#app");

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(m => m.meta.requireAuth)) {
//         // 对路由进行验证
//         if (store.state.isLogin) {
//             // 已经登陆
//             next(); // 正常跳转到你设置好的页面
//         } else {
//             // 未登录则跳转到登陆界面
//             next({path: "/login"});
//         }
//     } else {
//         next();
//     }
// });
