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
        min-width="15"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="danger" @click="deleteUser(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>


  </div>
</template>

<script>
import { getUserList } from "@/api/blockuser";

export default {
  data() {
    return {
      list: [],

      listLoading: true,

    };
  },
  created() {
    this.getList();
  },
  methods: {
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
