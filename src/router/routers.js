import home from "./modules/home";

/**
 * 在主框架内显示
 */

const frameIn = [home];

/**
 * 在主框架之外显示
 */

/* const frameOut = [
  // 注册
  {
    path: '/login/:tenantId?',
    path: "/registered",
    name: "registered",
    meta: {
      // title: '$t:page.login.title'
      title: "注册页面",
    },
    props: true,
    component: () => import("@/pages/account/registered"),
  },

  // 默认首页
  {
    path: "/login",
    name: "portal-index",
    meta: {
      title: "登录",
    },

    component: () => import("@/pages/account/login"),
  },

  {
    path: "/join",
    name: "Join",
    meta: {
      title: "欢迎入驻",
    },
    component: () => import("@/pages/account/login/join"),
  },
  {
    path: "/reset",
    name: "Reset",
    meta: {
      title: "重置密码",
    },
    component: () => import("@/pages/account/login/reset"),
  },

  {
    path: "/stock/putin/print",
    name: `stock-putin-print`,
    meta: {
      title: "入库单打印",
    },
    component: () => import("@/pages/stock/putin/print"),
  },
  {
    path: "/stock/shipment/print",
    name: `stock-shipment-print`,
    meta: {
      title: "出库单打印",
    },
    component: () => import("@/pages/stock/shipment/print"),
  },
  {
    path: "/stock/delivery/print",
    name: `stock-delivery-print`,
    meta: {
      title: "发货单打印",
    },
    component: () => import("@/pages/stock/delivery/print"),
  },
  {
    path: "/stock/check/print",
    name: `stock-check-print`,
    meta: {
      title: "盘点单打印",
    },
    component: () => import("@/pages/stock/check/print"),
  },
]; */

/**
 * 错误页面
 */

/* const errorPage = [
  {
    path: "/403",
    name: "403",
    meta: {
      title: "403",
    },
    component: () => import("@/pages/system/error/403"),
  },
  {
    path: "/500",
    name: "500",
    meta: {
      title: "500",
    },
    component: () => import("@/pages/system/error/500"),
  },
  {
    path: "*",
    name: "404",
    meta: {
      title: "404",
    },
    component: () => import("@/pages/system/error/404"),
  },
]; */

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn];
