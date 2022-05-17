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
      <el-table-column align="center" label="订单编号" min-width="20">
        <template slot-scope="{ row }">
          <span>{{ row.orderno }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="评级" min-width="20">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.grade" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="评论内容" min-width="20">
        <template slot-scope="{ row }">
          <span>{{ row.comment }}</span>
        </template>
      </el-table-column>

   
    </el-table>

    
  </div>
</template>

<script>
import {getAllComment} from "@/api/order";

export default {
  data() {
    return {
      list: null,
      detail: {
        data: null,
        info: null
      },
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      dialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {

    async getList() {
      this.listLoading = true;
      let r = await getAllComment();
      this.list = r.data
      
      console.log(this.list)
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
