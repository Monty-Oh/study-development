import Vue from "vue";
import VueRouter from 'vue-router';

import AskView from "../views/AskView";
import JobsView from "../views/JobsView";
import NewsView from "../views/NewsView";
import UserView from "../views/UserView";
import ItemView from "../views/ItemView";
import JqxGridTest from '../views/JqxGridTest';

Vue.use(VueRouter);

// 라우터에 관한 정보들을 저장하는 객체
export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            redirect: '/news',
        },
        {
            name: 'news',
            // url 주소에 관한 정보
            path: '/news',
            // url에 해당하는 표시될 특정 컴포넌트
            component: NewsView,
        },
        {
            name: 'ask',
            path: '/ask',
            component: AskView
        },
        {
            path: '/jobs',
            component: JobsView
        },
        {
            path: '/user/:id',
            component: UserView,
        },
        {
            path: '/item/:id',
            component: ItemView
        },
        {
            path: '/grid',
            component: JqxGridTest,
        }
    ],
});