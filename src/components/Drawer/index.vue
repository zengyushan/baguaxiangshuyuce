<template>
  <el-drawer
    ref="drawer"
    v-bind="$attrs"
    :visible.sync="$parent.isShow"
    :wrapper-closable="closeOnClickModal"
    v-on="$listeners"
    @opened="openedFunc"
    @closed="closedFunc"
  >
    <div slot="title">
      <span class="title">{{ $attrs.title }}</span>
      <i
        :class="[fullscreen ? `el-icon-copy-document` : `el-icon-full-screen`]"
        @click="fullScreenFn"
      ></i>
    </div>
    <div class="content">
      <slot name="content" />
    </div>
    <div class="footer">
      <slot name="footer" />
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    visible: {
      typeof: Boolean,
      default: false,
    },
    closeOnClickModal: {
      typeof: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fullscreen: false,
      isShow: false,
    };
  },
  computed: {},
  mounted() {
    const domList = document.getElementsByClassName("el-drawer__wrapper") || [];
    console.log("domList", domList);
    for (let i = 0; i < domList?.length; i++) {
      domList[i].title = "";
    }
  },
  methods: {
    open() {
      this.isShow = true;
    },
    openedFunc() {
      this.$nextTick(() => {
        const domList =
          document.getElementsByClassName("el-drawer__wrapper") || [];
        console.log("domList", domList);
        for (let i = 0; i < domList?.length; i++) {
          domList[i].title = "";
        }
      });
    },
    closedFunc() {
      this.fullscreen = false;
      this.$emit("closedFunc");
    },
    fullScreenFn() {
      this.fullscreen = !this.fullscreen;
      if (this.fullscreen) {
        this.$attrs.size = "100%";
      } else {
        this.$attrs.size = "45%";
      }
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-drawer {
  .title {
    margin-right: 5px;
  }
  .el-drawer__header {
    height: 56px;
    padding: 16px 24px;
    border-bottom: 1px solid rgb(240, 240, 240);
    margin: 0;
    box-sizing: border-box;

    span {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.85);
    }

    & > span:focus-visible,
    & > span:focus {
      outline-width: 0;
    }

    .el-drawer__close-btn:focus-visible,
    .el-drawer__close-btn:focus {
      outline-width: 0;
    }
  }
  .icon {
    cursor: pointer;
  }
  .el-drawer__body {
    height: calc(100% - 56px);

    .content {
      height: calc(100% - 50px);
      padding: 16px 24px;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .footer {
      height: 50px;
      padding: 10px 0 10px 0;
      border-top: 1px solid rgb(240, 240, 240);
      display: flex;
      justify-content: center;

      .el-button {
        height: 30px;
      }
    }
  }
}
</style>
