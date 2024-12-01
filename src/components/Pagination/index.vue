<template>
  <div class="pagination-container">
    <el-pagination
      v-show="isAllowShow || total > 0"
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      :small="small"
      :pager-count="pagerCount"
      :popper-class="[isPopperClass ? 'app-select' : '']"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    isAllowShow: {
      type: Boolean,
      default: false,
    },
    isPopperClass: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1;
      // this.$emit("pagination", { page: this.currentPage, limit: val });
      if (
        this.currentPage >
        (Math.floor(this.total / val) === 0 ? 1 : Math.floor(this.total / val))
      ) {
        //如果当前页数大于限定值
        console.log("页数大于限定", this.currentPage);
        this.$emit("pagination", { page: 1, limit: val });
      } else {
        console.log("页数小鱼限定", this.currentPage);
        this.$emit("pagination", { page: 1, limit: val });
      }
      if (this.autoScroll) {
        this.$utils.scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        this.$utils.scrollTo(0, 800);
      }
    },
  },
};
</script>

<style lang="less" scoped>
//@import "@/styles/element-variables.scss";

.pagination-container {
  padding: 14px 0;
  margin: 0;
  text-align: left;
}
::v-deep .el-pagination {
  height: 22px;
  padding: 0;

  .el-pagination__total {
    height: 22px;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
  }

  .el-pagination__sizes {
    height: 22px;
    .el-input {
      width: 76px;
      height: 22px;

      .el-input__inner {
        height: 22px;
        padding: 0 22px 0 8px;
        border-radius: 2px;
        font-weight: 400;
        font-size: 12px;
      }
    }

    .el-select .el-select__caret {
      line-height: 22px;
    }
  }

  .btn-prev,
  .btn-next {
    height: 22px;
    line-height: 22px;
  }

  .el-pager {
    li {
      min-width: 22px;
      height: 22px;
      line-height: 20px;
      font-weight: 400;
      font-size: 12px;
      // border: 1px solid #ffffff;
    }

    .more::before {
      line-height: 22px;
    }
  }

  // 解决下拉框对不齐的问题
  span:not([class*="suffix"]) {
    line-height: 22px;
  }

  .el-pagination__jump {
    height: 22px;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.85);

    .el-input {
      height: 22px;
      margin-right: 0;
      padding-right: 0;

      .el-input__inner {
        height: 22px;
        padding: 0 3px;
        border-radius: 2px;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #307bfc;
  color: #fff;
}
::v-deep .el-pager li.active {
  color: #307bfc;
}
.el-pagination span:not([class*="suffix"]),
.el-pagination button {
  line-height: 22px;
}
</style>
