<template lang="html">
  <div class="wangeditor">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="wangeditor" class="text"></div>
  </div>
</template>

<script>
import E from "wangeditor";
// import { REQUEST } from '@/utils/constant'
export default {
  data() {
    return {
      wangEditor: null,
      wangEditorInfo: null,
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    isClear: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.wangEditor.txt.clear();
        this.wangEditorInfo = null;
      }
    },
    value(value) {
      if (value !== this.wangEditor.txt.html()) {
        // this.isClear = false;
        this.wangEditor.txt.html(this.value); //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
      }
    },
  },
  mounted() {
    this.initEditor();
    if (this.wangEditor) {
      this.wangEditor.txt.html(this.value);
      if (this.isDisabled) {
        this.wangEditor.disable();
      }
    }
  },
  methods: {
    initEditor() {
      this.wangEditor = new E(this.$refs.toolbar, this.$refs.wangeditor);
      this.wangEditor.customConfig = this.wangEditor.customConfig
        ? this.wangEditor.customConfig
        : this.wangEditor.config;
      this.wangEditor.customConfig.uploadImgShowBase64 = false; // base64存储图片（推荐）
      // this.wangEditor.customConfig.uploadImgServer = `${REQUEST.UPLOAD_URL}/file/upload` // 配置服务器端地址（不推荐）
      this.wangEditor.customConfig.uploadImgHeaders = {}; // 自定义header
      this.wangEditor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.wangEditor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为（默认最大支持2M）
      this.wangEditor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传6张图片
      this.wangEditor.customConfig.uploadImgTimeout = 1 * 60 * 1000; // 设置超时时间（默认1分钟）
      this.wangEditor.config.pasteFilterStyle = false;
      // 配置菜单
      this.wangEditor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        // "table", // 表格
        // "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen", // 全屏
      ];
      this.wangEditor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调（不推荐）
          console.log("result111", result);
          insertImg(result.data.url);
        },
      };
      this.wangEditor.customConfig.onchange = (html) => {
        this.wangEditorInfo = html;
        this.$emit("change", this.wangEditorInfo); // 将内容同步到父组件中
      };
      this.wangEditor.config.onpaste = function (e) {
        // e.clipboardData 包含了剪贴板的数据
        const clipboardData = e.clipboardData || window.clipboardData;
        if (clipboardData) {
          // 获取剪贴板的 HTML 数据
          const html = clipboardData.getData("text/html");
          if (html) {
            // 如果存在 HTML 数据，则使用 insertHTML 方法插入保留格式的内容
            editor.cmd.do("insertHTML", html);
            // 阻止默认的粘贴行为，防止清除格式
            e.preventDefault();
          }
        }
      };
      // 创建富文本编辑器
      this.wangEditor.create();
    },
  },
};
</script>

<style lang="less" scoped>
.wangeditor {
  border: 2px solid #e6e6e6;
  box-sizing: border-box;
  .toolbar {
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
  }
  .text {
    height: 300px;
    overflow-y: auto;
  }
}
</style>
