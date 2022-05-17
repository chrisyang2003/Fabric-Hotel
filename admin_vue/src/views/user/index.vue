<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="用户ID" min-width="10">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户公钥地址" min-width="20" >
        <template slot-scope="{ row }">
          <span>{{ row.pk.slice(0, 10) + '...' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="随机数" min-width="30">
        <template slot-scope="{ row }">
          <span>{{ row.r}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="加密密钥" min-width="25" >
        <template slot-scope="{ row }">
          <span>{{ row.enc_pk.slice(0, 15) + '...'}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="上一次提交证明" align="center" min-width="25">
        <template slot-scope="{ row }">
          <span>{{ row.lastproof.slice(0, 15) }}</span>
        </template>
      </el-table-column>

       <el-table-column
        label="操作"
        align="center"
        min-width="25"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" @click="showDetail(row, $index)">
            详情
          </el-button>
          <el-button type="danger" @click="deleteUser(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      :before-close="cancel"
    >
    <el-descriptions class="margin-top" :column="2" border>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户ID
      </template>
      {{detail.id}}
    </el-descriptions-item>

     <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        随机数
      </template>
      {{detail.r}}
    </el-descriptions-item>

    <el-descriptions-item :span="2">
      <template slot="label">
        <i class="el-icon-user"></i>
        用户公钥地址
      </template>
      {{detail.pk}}
    </el-descriptions-item>

    

    <el-descriptions-item :span="2">
      <template slot="label">
        <i class="el-icon-user"></i>
        加密密钥
      </template>
      {{detail.enc_pk}}
    </el-descriptions-item>
    
    
  </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">关闭</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { getUserList } from "@/api/blockuser";

export default {
  data() {
    return {
      list: [],
      listLoading: true,

      detail: {
        id:null,

      },
      dialogVisible: false,

    };
  },
  created() {
    this.getList();
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
    },
    showDetail(row, index){
      this.detail = row
      this.dialogVisible = true;
      
    },
    deleteUser(row, index){
      console.log(row, index);
    },
    async getList() {
      this.listLoading = true;
      let r = await getUserList();
      r.forEach(element => {
        this.list.push(element.value);
      });

      console.log(this.list);
      this.listLoading = false;
    },
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
