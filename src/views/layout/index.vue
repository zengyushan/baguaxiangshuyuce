<template>
  <el-container>
    <el-container>
      <el-container>
        <el-main>
          <!-- 需要缓存数据的页面 -->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <!-- 不需要缓存数据的页面 -->
          <router-view v-if="!$route.meta.keepAlive" />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// 元素是否在可视区域
function isElementInViewport(el) {
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;
  console.log("w :>> ", w);
  console.log("h :>> ", h);
  // let rect = el.getBoundingClientRect();
  // console.log('rect :>> ', rect);
  // return (
  //   rect.top >= 0 &&
  //   rect.left >= 0 &&
  //   rect.bottom <=
  //     (window.innerHeight || document.documentElement.clientHeight) &&
  //   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  // );
}

export default {
  components: {
  },

  // watch: {
  //   $route: {
  //     handler() {
  //       this.handleUpdateMenuState();
  //     },
  //     immediate: true,
  //   },
  //   // 在展开/收起侧边菜单栏时，更新一次 menu 的状态
  //   menuCollapse() {
  //     this.handleUpdateMenuState();
  //   },
  // },
  created() {},

  mounted() {
    this.handleUpdateMenuState();
  },
  methods: {
    handleUpdateMenuState() {
      isElementInViewport();
      // this.$nextTick(() => {
      //   if (this.$refs.menu) {
      //     this.$refs.menu.updateActiveName();
      //     if (this.menuAccordion) this.$refs.menu.updateOpened();
      //     // 聚焦当前项
      //     this.$nextTick(() => {
      //       const $activeMenu = document.getElementsByClassName(
      //         "ivu-menu-item ivu-menu-item-active ivu-menu-item-selected"
      //       );
      //       if (
      //         $activeMenu &&
      //         $activeMenu.length &&
      //         !isElementInViewport($activeMenu[0])
      //       ) {
      //         const activeMenuTop = $activeMenu[0].getBoundingClientRect().top;
      //         const $menu = this.$refs.menu.$el;
      //         setTimeout(() => {
      //           this.$ScrollTop($menu, {
      //             to: activeMenuTop,
      //             time: 0,
      //           });
      //         }, 300);
      //       }
      //     });
      //   }
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  overflow: hidden;
  padding: 0;
}
.el-header {
  background-color: #409eff;
  text-align: center;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.el-aside {
  background-color: #fff;
  text-align-last: left;
  height: 100%;
}

.el-main {
  color: #666;
  position: relative;
  padding: 0;
  background-color: #dfdfdf;
  .el-card {
    margin-top: 34px;
  }
}

img {
  height: 35px;
  width: 35px;
  border-radius: 100%;
  border: #d5eaff 1px solid;
}
</style>
