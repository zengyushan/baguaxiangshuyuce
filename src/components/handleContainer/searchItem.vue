<template>
  <div class="search-item">
    <span v-if="label">{{ label }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'search-item',
  props: {
    label: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.search-item {
  display: flex;
  align-items: center;
  margin-right: 20px;

  & > span {
    white-space: nowrap;
    line-height: 22px;

    &::after {
      content: "：";
    }
  }
}
</style>