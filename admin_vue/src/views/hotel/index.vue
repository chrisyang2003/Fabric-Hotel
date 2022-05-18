<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form label-width="80px" :model="form">
          <el-form-item label="酒店名字">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="酒店简介">
            <el-input v-model="form.bio"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>

          <el-form-item label="酒店封面">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "隐私保护酒店",
        bio: "这是简介",
        tele: "19934358875",
      },
      fileList: [{name: 'food.jpeg', url: 'http://chrisyy.top:5000/assets/addons/booking/img/swiper1.jpg'}]
    };
  },
};
</script>

<style scoped>
</style>
