<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  components: { Editor, Toolbar },
  props: {
    /* 编辑器的内容 */
    value: {
      type: String,
      default: "",
    },
    /* 高度 */
    height: {
      type: Number,
      default: null,
    },
    /* 最小高度 */
    minHeight: {
      type: Number,
      default: null,
    },
    /* 只读 */
    readOnly: {
      type: Boolean,
      default: false,
    },
    // 上传文件大小限制(MB)
    fileSize: {
      type: Number,
      default: 5,
    },
    /* 类型（base64格式、url格式） */
    type: {
      type: String,
      default: "url",
    },
  },
  data() {
    return {
      editor: null,
      html: "<p></p>",
      currentValue: "",
      // 工具栏配置（注意结构，否则不起作用）
      toolbarConfig: {
        excludeKeys: [
          "todo",
          "codeBlock",
          "image",
          "strikeThrough",
          "underline",
          "backColor",
          "quote",
        ],
        toolbarKeys: [
          // 菜单 key
          "headerSelect",

          // 分割线
          "|",

          // 菜单 key
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "underline",
          "backColor",
          "quote",
          "fontFamily",
          "fontSize",
          "lineHeight",
          "indent",
          // "list",
          // "justify",
          // "link",
          "image", // 确保菜单中有图片上传选项
          // // "video",
          // "table",
          "code",
          // "splitLine",
          "undo",
          "redo",
          // "draft",

          // 菜单组，包含多个菜单
          // {
          //   key: "group-more-style", // 必填，要以 group 开头
          //   title: "更多样式", // 必填
          //   iconSvg: "<svg>....</svg>", // 可选
          //   menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
          // },
          // 继续配置其他菜单...
        ],
      },
      // 菜单配置（注意结构，否则不起作用）
      editorConfig: {
        placeholder: "请输入内容...",
        /*  MENU_CONF: {
          uploadImage: {
            // 自定义上传图片 方法
            customUpload: this.uploadImg,
            // 上传接口设置文件名
            fieldName: "file",
            meta: {
              token: getToken(),
            },
          },
          uploadVideo: {
            customUpload: this.uploadVideo,
            fieldName: "file",
            meta: {
              token: getToken(),
            },
          },
        }, */
      },
      mode: "default", // or 'simple'
      // 图片、视频上传服务器地址
      uploadFileUrl: process.env.VUE_APP_BASE_API + "/common/upload",
    };
  },
  watch: {
    // 监听父组件中editor值的变化
    value: {
      handler(val) {
        this.html = val;
        this.currentValue = val;
      },
      immediate: true,
    },
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
