<template>
  <div class="photo">
    <el-upload
      action="/cmict/file/picture/upload"
      list-type="picture-card"
      :headers="headers"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileListImg"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png/jpeg文件，且不超过2MB
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// import util from "@/libs/util";
// import { init_fileDel, init__imgList, init_imgShow } from "@/api/product/list";

export default {
  name: "uploadImage",
  props: {
    type: {
      type: String,
      default: "product",
    },
    relatedId: {
      type: String,
      default: "1",
    },
  },
  data() {
    return {
      id: null,
      productGoodsId: null,
      dialogImageUrl: "",
      action: "/cmict/file/picture/upload",
      dialogVisible: false,
      disabled: false,
      headers: {
        Authorization: "",
        // Authorization: util.cookies.get("token") || "",
      },
      fileIdList: [],
      fileListImg: [],
    };
  },
  async created() {
    // this.productGoodsId = this.$route.query.id;
  },
  mounted() {
    // this.getData(this.type);
  },

  // activated() {
  //   if (this.$route.query.id !== this.productGoodsId) {
  //     this.productGoodsId = this.$route.query.id;
  //     this.getData(this.type);
  //   }
  // },

  methods: {
    /*  async getData(val) {
      let list = [];
      this.fileListImg = [];
      let params = {
        relatedId: this.relatedId,
        fileTag: val === "product" ? "product_show" : "goods_show",
      };
      let res = await init_imgList(params);
      let { code, data } = res;
      if (code !== 200) return;

      data.forEach((img) => {
        list.push(img.id);
        init_imgShow({ id: img.id }).then((res) => {
          this.src =
            "data:image/jpeg;base64," + this.$utils.arrayBufferToBase64(res);

          this.fileListImg.push({
            name: `data:image/jpeg;base64,${this.$utils.arrayBufferToBase64(
              res
            )}`,
            url:
              "data:image/jpeg;base64," + this.$utils.arrayBufferToBase64(res),
            id: img.id,
          });
        });
      });
      this.fileIdList = this.$utils.arrUnique(list);
      this.$emit("change", this.fileIdList);
    }, */

    async handleRemove(file) {
      let fileIdArr = [];
      // fileIdArr.push(this.id);
      let params = {
        idList: JSON.stringify(fileIdArr),
      };

      let res = await init_fileDel(params);
      if (!res) return;
      this.fileIdList.splice(
        this.fileIdList.findIndex(
          (v) => v === file?.id || v === file?.response?.data?.id
        ),
        1
      );

      this.$emit("change", this.fileIdList);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file?.url;
      this.dialogVisible = true;
    },

    handleSuccess(res, file, fileList) {
      let { code, data } = res;
      if (code !== 200) return;
      this.id = data?.id;
      this.fileIdList.push(data?.id);
      this.$emit("change", this.fileIdList);
    },
    beforeAvatarUpload(file) {
      let acceptList = ["png", "jpeg", "jpg"];
      let fileType = file.name.split(".").pop().toLowerCase();
      if (acceptList.indexOf(fileType) === -1) {
        this.$message.error("格式不正确");
        return false;
      }
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error("图片大小不能超过 2M!");
        return false;
      }
      if (file.name.length > 100) {
        this.$message.error("图片名称过长");
        return false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.photo {
  padding: 20px;
  /deep/.el-upload--picture-card {
    width: 64px;
    height: 64px;
    line-height: 66px;
    i {
      font-size: 24px;
    }
  }

  /deep/.el-upload-list__item-actions {
    font-size: 14px !important;
  }

  /deep/.el-upload-list__item {
    width: 64px;
    height: 64px;
  }

  /deep/.el-upload-list__item-delete {
    margin-left: 10px;
  }
}
</style>
