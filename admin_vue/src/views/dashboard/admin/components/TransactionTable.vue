<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="最近交易订单" min-width="60">
      <template slot-scope="{row}">
        {{ row.orderno }}
      </template>
    </el-table-column>
    <el-table-column label="房间ID" width="80" align="center">
      <template slot-scope="{row}">
        {{ row.houseid }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getAllorder } from '@/api/order'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        待付款: "primary",
        已支付: "success",
        失败: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    getAllorder().then(res => {
      res.slice(0, 6).forEach(element => {
        this.list.push(element.value)
      });
      
    })
  },
}
</script>
