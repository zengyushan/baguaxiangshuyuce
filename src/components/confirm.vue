<template>
  <el-button size="small" v-bind="$attrs" @click="open">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: "pl-button",
  props: {
    isConfirm: {
      type: Boolean,
      default: false,
    },
    confirmConfig: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    open() {
      const {
        message = "此操作将永久删除该数据, 是否继续?",
        title = "提示",
        confirmButtonText = "确定",
        cancelButtonText = "取消",
        type = "warning",
      } = this.confirmConfig;

      this.$msgbox({
        title,
        message,
        confirmButtonText,
        cancelButtonText,
        type,
        showCancelButton: true,
        beforeClose: (action, instance, done) => {
          this.$emit("beforeClose", action, instance, done);
        },
      })
        .then(() => {
          this.$emit("confirm", this.isConfirm);
        })
        .catch(() => {
          this.$emit("cancel", this.isConfirm);
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
