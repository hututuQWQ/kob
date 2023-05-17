/** @format */

import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";

const routes = [
  {
    path: '/',
    name: "home",
    redirect: "/articles/",
    meta: {
      requestAuth: true,
    },

  },
  {
    path: "/articles/",
    name: "articles",
    component: () => import("@/views/firstPage/FirstPageView.vue"),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/articles/:articleId/",
    name: "articles_content",
    component: () => import("@/views/firstPage/ArticlesContent.vue"),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: () => import("@/views/pk/PkIndexView.vue"),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/record/",
    name: "record_index",
    component: () => import("@/views/record/RecordIndexView.vue"),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/record/:recordId/",
    name: "record_content",
    component: () => import("@/views/record/RecordContentView.vue"),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: () => import("@/views/ranklist/RanklistIndexView.vue"),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: () => import("@/views/user/bot/UserBotIndexView.vue"),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/user/information",
    name: "user_information_index",
    component: () => import("@/views/user/account/UserAccountInformation.vue"),
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: () => import("@/views/user/account/UserAccountLoginView.vue"),
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: () => import("@/views/user/account/UserAccountRegisterView.vue"),
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/404/",
    name: "not_found_index",
    component: () => import("@/views/error/NotFound.vue"),
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let flag = 1;
  const jwt_token = localStorage.getItem("jwt_token");

  if (jwt_token) {
    store.commit("updateToken", jwt_token);
    store.dispatch("getinfo", {
      success() {},
      error() {
        alert("token无效,请重新登录！");
        router.push({ name: "userLogin" });
      },
    });
  } else {
    flag = 2;
  }

  if (to.meta.requestAuth && !store.state.user.is_login) {
    if (flag === 1) {
      next();
    } else {
      next({ name: "user_account_login" });
    }
  } else {
    next();
  }
});

export default router;
