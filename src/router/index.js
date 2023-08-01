import Vue from "vue";
import VueRouter from "vue-router";
import NotFoundComponent from "../components/NotFoundComponent.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "ForumHome",
        component: () => import("../components/Forum/ForumHome.vue")
    },
    {
        path: "/Login",
        name: "Login",
        component: () => import("../components/Login.vue")
    },
    {
        path: "/Register",
        name: "Register",
        component: () => import("../components/Register.vue")
    },
    {
        path: "/UserHome",
        name: "UserHome",
        meta: {requireAuth: true},
        component: () => import("../components/User/UserHome.vue")
    },
    {
        path: "/PostDetail",
        name: "PostDetail",
        component: () => import("../components/Post/PostDetail.vue")
    },
    {
        path: "*", component: NotFoundComponent
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});


export default router;
