<template>
  <div class="handle-container">
    <div class="search-box">
      <slot name="search"></slot>
      <search-item>
        <div class="button-class">
          <el-button v-if="searchVisible" type="primary" @click="search">
            查询
          </el-button>
          <el-button v-if="resetVisible" type="success" @click="reset">
            重置
          </el-button>
        </div>
      </search-item>
    </div>
    <div class="handle-box">
      <slot name="handle"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchVisible: {
      type: Boolean,
      default: true,
    },
    resetVisible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    search() {
      this.$emit("search");
    },
    reset() {
      this.$emit("update:value", {});
      this.$emit("reset");
    },
  },
};
</script>

<style lang="less" scoped>
.handle-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
  .search-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .search-item:last-child {
      margin-right: 0;
    }
  }

  .handle-box {
    display: flex;
    justify-content: flex-end;

    ::v-deep .el-button + .el-dropdown {
      margin-left: 4px;
    }
  }
}
</style>
