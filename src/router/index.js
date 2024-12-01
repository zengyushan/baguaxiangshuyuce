import Vue from "vue";
import VueRouter from "vue-router";
// 重写路由原型push方法 解决警告问题
const pushMehod = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return pushMehod.call(this, to).catch((err) => err);
};

Vue.use(VueRouter);

import routers from "./routers";
const routes = routers;

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
