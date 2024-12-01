<template>
  <div class="detail" v-bind="$attrs" v-on="$listeners">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="移动端详情" name="first">
          <div class="editor-view">
            <ckeditor
              id="editor"
              :editor="editor"
              v-model="ckeditorList.appDetail"
              :config="editorConfig"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="电脑端详情" name="second">
          <div class="editor-view">
            <ckeditor
              id="editor"
              :editor="editor"
              v-model="ckeditorList.pcDetail"
              :config="editorConfig"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
const CONFIG = {
  /* imageUpload: (file) => {
    return new Promise((resolve) => {
      return uploadFile(file).then((res) => {
        if (res) {
          resolve({
            url:
              process.env.VUE_APP_IP + "/cmict/file/resource/show?id=" + res.id,
          });
        }
      });
    });
  },
  videoUpload: (file) => {
    return new Promise((resolve) => {
      return uploadResource(file).then((res) => {
        resolve({
          url:
            process.env.VUE_APP_IP + "/cmict/file/resource/show?id=" + res.id,
        });
      });
    });
  }, */
  mediaEmbed: {
    extraProviders: [
      {
        name: "leo",
        url: [/(.*?)/],
        html: (match) => {
          const src = match.input;
          return (
            '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;pointer-events: auto;">' +
            '<video controls style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" src="' +
            src +
            '">' +
            "</video>" +
            "</div>"
          );
        },
      },
    ],
  },
  licenseKey: "",
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "fontBackgroundColor",
      "fontColor",
      "fontSize",
      "fontFamily",
      "link",
      "insertTable",
      "imageUpload",
      "mediaEmbed",
      "|",
      "indent",
      "outdent",
      "alignment",
      "|",
      "blockQuote",
      "code",
      "codeBlock",
      "highlight",
      "horizontalLine",
      "numberedList",
      "bulletedList",
      "removeFormat",
      "specialCharacters",
      "emoji",
      "restrictedEditingException",
      "strikethrough",
      "subscript",
      "superscript",
      "todoList",
      "undo",
      "redo",
    ],
  },
  language: "zh-cn",
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties",
    ],
  },
};
import ClassicEditor from "@leodigital/ckeditor5";
// import { uploadFile, uploadResource } from "@/api/file";

export default {
  props: {
    // ckeditorList: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       pcDetail: null,
    //       appDetail: null,
    //     };
    //   },
    // },
  },
  data() {
    return {
      ckeditorList: {
        pcDetail: null,
        appDetail: null,
      },
      activeName: "first",
      editor: ClassicEditor,
      editorConfig: CONFIG,
      id: null,
    };
  },

  watch: {
    ckeditorList: {
      deep: true,
      handler(newVal, oldVal) {
        this.$emit("change", newVal);
      },
    },
  },

  /* async created() {
    this.id = this.$route.query.id;
  },
  activated() {
    if (this.$route.query.id !== this.id) {
      this.id = this.$route.query.id;
      this.activeName = `first`;
    }
  }, */
};
</script>

<style lang="less" scoped>
.detail {
  padding: 20px;
}

.editor-view {
  /deep/.ck-content {
    min-height: 200px;
  }
}
</style>
