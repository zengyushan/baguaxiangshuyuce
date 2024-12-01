<template>
  <div v-on="$listeners" v-bind="$attrs">
    <el-cascader
      id="cascader"
      :options="options"
      :props="props"
      :size="size"
      @change="change"
      @clearCheckedNodes="clearCheckedNodes"
      :clearable="clearable"
    >
      <!-- <template v-slot:empty>
        <p>头部</p>
      </template> -->

      <p slot="empty">No more data</p>
    </el-cascader>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "medium",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    change(val) {
      this.$emit("change", val);
    },
    clearCheckedNodes(val) {
      this.$emit("change", val);
    },

    visibleChange() {
      console.log("123", 123);
      let a = document.querySelectorAll(".el-cascader-menu__empty-text");
      a.forEach((e) => {
        e.innerText = "请添加频道";
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-cascader-panel {
  /deep/.el-checkbox {
    display: none !important;
    background: #f0f;
  }
}
</style>