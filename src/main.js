import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
// 重置样式
import "@/assets/css/conmon.less";
import "@/assets/css/variables.less";

// element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.use(ElementUI, { zIndex: 600 }); //自定义层级
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
// 修改el-pagination默认文字
zhLocale.el.pagination.total = "总计" + `{total}` + "条";
zhLocale.el.pagination.pagesize = "条/页";
zhLocale.el.pagination.goto = "前往";
zhLocale.el.pagination.pageClassifier = "";

// 注册公共函数
import utils from "@/utils/common";
Vue.prototype.$utils = utils;

// 注册全局过滤器
import * as filters from "@/filters/index";
Object.keys(filters).forEach((v) => {
  Vue.filter(v, filters[v]);
});

// !电子签名
import vueEsign from "vue-esign";
Vue.use(vueEsign);

// !滑块组件
import SlideVerify from "vue-monoplasty-slide-verify";
Vue.use(SlideVerify);

// !config配置文件
import VUE_GLOBAL from "@/config";

Vue.prototype.$config = {
  VUE_GLOBAL,
};

import handleContainer from "@/components/handleContainer/index.js";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
