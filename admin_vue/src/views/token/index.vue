<template>
  <div class="app-container">
    <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="card">
            <div slot="header">
              <h2>ERC20代币</h2>
              <span>{{ "代币名字: " + this.info.tokenName }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ "代币标识: " + this.info.Symbol }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ "代币发行总量: " + this.info.totalSupply }}</span>
            </div>
            <el-table :data="list" style="width: 100%; padding-top: 15px">
              <el-table-column label="持有人(前5)" min-width="60">
                <template slot-scope="{ row }">
                  {{ row.key }}
                </template>
              </el-table-column>
              <el-table-column label="余额" width="80" align="center">
                <template slot-scope="{ row }">
                  {{ row.value }}
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card class="card">
            <div class="chart-wrapper">
              <pie-chart/>
            </div>
          </el-card>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="card">
            <div slot="header">
              <h2>隐私代币</h2>
              <span>{{ "链上承诺总数: " + this.info.tokenName }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ "已公开序列号总数: " + this.info.Symbol }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ "代币发行总量: " + this.info.totalSupply }}</span>
            </div>
            <el-table :data="list" style="width: 100%; padding-top: 15px">
              <el-table-column label="最近序列号" min-width="60">
                <template slot-scope="{ row }">
                  {{ row.name }}
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card class="card">
            <div class="chart-wrapper">
              <pie-chart/>
            </div>
          </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getAllorder, getOrderDetailById} from "@/api/order";
import { getTokenList, getTokenInfo } from "@/api/token";
import PieChart from "./PieChart";

export default {
  components: {
    // GithubCorner,
    PieChart,
  },
  data() {
    return {
      info: {
        tokenName: null,
        Symbol: null,
        totalSupply: null,
      },
      list: null,

    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.list = await getTokenList();
      this.info = await getTokenInfo();

      

    },
  },
};
</script>

<style scoped>
.card {
  height: 400px;
  margin-bottom: 20px;
}
.chart-wrapper {
  /* background: #fff;
  border: solid; */
  padding: 25px 16px 0;
  margin-bottom: 32px;
}
</style>
