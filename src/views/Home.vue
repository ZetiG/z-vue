<template>
  <el-form label-width="100px">
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    list-type="picture-card"
    :on-success="uploadImages"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-upload>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      urls: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    uploadImages (file, fileList) {
      this.urls.push(fileList.url)
      console.log('上传图片List->', fileList.url)
    },
    handleRemove (file, fileList) {
      console.log('删除图片->', file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
      console.log('放大预览->', file)
    },
    submitForm () {
      this.$axios({
        method: 'post',
        url: '/api/upload', // todo 待完成
        data: {
          urls: this.urls
        },
        headers: 'Content-Type: application/x-www-form-urlencoded'
      }).then(res => {
        this.$message({
          type: 'success',
          message: res.data.msg
        })
      }).catch(err => {
        console.log('请求异常:->', this.urls.toString())
        this.$message.error(err.data.message)
      }
      )
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
