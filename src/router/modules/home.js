import BasicLayout from "@/views/layout";

const meta = {
  keepAlive: true,
};
export default {
  path: "/",
  name: "home",
  component: BasicLayout,
  children: [
    {
      path: "/",
      name: "home",
      icon: "el-icon-menu",
      meta: { title: "首页" },
      component: () => import("@/views/home"),
    },
  ],
};
