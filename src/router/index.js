import Vue from "vue";
import VueRouter from "vue-router";
import NotFoundComponent from "../components/NotFoundComponent.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "forumHome",
        component: () => import("../components/ForumHome/ForumHome.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../components/Login.vue")
    },
    {
        path: "/loginbackstage",
        name: "loginbackstage",
        component: () => import("../components/BackStageHome/LoginBackStage.vue")
    },

    {
        path: "/BackStageHome",
        component: () => import("../components/BackStageHome/BackStageHome.vue"),
        children: [
            {
                path: "/usermanger",
                name: "usermanger",
                component: () => import("../components/BackStageHome/UserManger.vue")
            },
            {
                path: "/articlemanger",
                name: "articlemanger",
                component: () => import("../components/BackStageHome/ArticleManger.vue")
            },
            {
                path: "/typemanger",
                name: "typemanger",
                component: () => import("../components/BackStageHome/TypeManger.vue")
            }
        ]
    },
    {
        path: "/UserHome",
        meta: {requireAuth: true},
        component: () => import("../components/UserHome/UserHome")
    },
    {
        path: "/allarticlehome",
        component: () => import("../components/ArticleHome/AllArticleHome.vue")
    },

    {
        path: "/registerhome",
        component: () => import("../components/Register/RegisterHome")
    },

    {
        path: "*", component: NotFoundComponent
    },
    {
        path: "/details",
        name: "Details",
        component: () => import("../components/ArticleHome/Details")
    },
    {
        path: "/postarticle",
        name: "PostArticle",
        component: () => import("../components/ArticleHome/PostArticle")
    }
    ,
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});


export default router;
