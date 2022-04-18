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

      <el-table-column min-width="10" align="center" label="房间ID">
        <template slot-scope="{ row }">
          <span>{{ row.houseid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="交易哈希" min-width="40">
        <template slot-scope="{ row }">
          <span>{{ row.trx.slice(0, 30) + "..." }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="交易时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="住户信息">
        <template slot-scope="{ row }">
          <span>{{ row.liver }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" min-width="20">
        <template slot-scope="{ row }">
          <el-button type="primary" @click="showDetails(row.trx)"
            >详细信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="cancel"
    >
    <el-descriptions class="margin-top" title="详细信息" :column="3" border>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        订单编号
      </template>
      {{detail.orderno}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
  </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTrxList, getTrxById } from "@/api/trx";

export default {
  name: "InlineEditTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        待付款: "primary",
        已支付: "success",
        失败: "danger",
      };
      return statusMap[status];
    },
  },
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
    cancel() {
      this.dialogVisible = false;
    },
    async getList() {
      this.listLoading = true;
      this.list = await getTrxList(this.listQuery);
      this.listLoading = false;
    },
    async showDetails(id) {
      this.dialogVisible = true;
      this.detail = await getTrxById(id);
      console.log(this.detail);
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
