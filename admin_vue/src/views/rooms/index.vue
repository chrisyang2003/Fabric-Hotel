<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="dialogVisible = true"
      >
        添加房间
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="房间ID" min-width="10">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="房间类型" min-width="10">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="房间图片" min-width="10">
        <template slot-scope="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.image"
            :preview-src-list="[row.image]"
          >
          </el-image>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="标价/原价格" min-width="10">
        <template slot-scope="{ row }">
          <span>{{ row.market_price + "/" + row.house_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="房间大小" min-width="10">
        <template slot-scope="{ row }">
          <span>{{ row.area + 'm^2'}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="宜住人数" min-width="5">
        <template slot-scope="{ row }">
          <span>{{ row.livenums }}</span>
        </template>
      </el-table-column>

      

      <el-table-column width="120px" align="center" label="房间标签" min-width="10">
        <template slot-scope="{ row }">
          <span>{{ row.tag.join(',') }}</span>
        </template>
      </el-table-column>

      

       <el-table-column label="房间状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status? "已入住": "空房" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="20"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" @click="handleUpdate(row, $index)">
            Edit
          </el-button>
          <el-button
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="cancel"
    >
      <el-form ref="form" :model="hotelForm" label-width="80px">

        
        <el-form-item v-if="isedit" label="房间ID">
          <el-input v-model="hotelForm.id" :disabled="true"></el-input>
        </el-form-item>


        <el-form-item label="房间类型">
          <el-select v-model="hotelForm.name" placeholder="请选择房间类型">
            <el-option label="暑假特价房" value="暑假特价房"></el-option>
            <el-option label="暑假出游套房" value="暑假出游套房"></el-option>
            <el-option label="商务单间" value="商务单间"></el-option>
            <el-option label="普通标间" value="普通标间"></el-option>
          </el-select>
        </el-form-item>
        

         <el-form-item label="标价/原价">
           <el-col :span="11">
             <el-input v-model="hotelForm.market_price"></el-input>
           </el-col>
            <el-col :span="2" style="text-align: center;" >
             /
           </el-col>
           <el-col :span="11">
             <el-input v-model="hotelForm.house_price"></el-input>
           </el-col>
        </el-form-item>


        <el-form-item label="宜住人数">
          <el-select v-model="hotelForm.livenums" placeholder="请选择宜住人数">
            <el-option label="1人" value="1"></el-option>
            <el-option label="2人" value="2"></el-option>
            <el-option label="3人" value="3"></el-option>
            <el-option label="4人" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间面积">
          <el-select v-model="hotelForm.area" placeholder="请选择房间面积">
            <el-option label="10m^2" value="10"></el-option>
            <el-option label="15m^2" value="15"></el-option>
            <el-option label="20m^2" value="20"></el-option>
          </el-select>
        </el-form-item>


         <el-form-item label="图片链接">
          <el-input v-model="hotelForm.image"></el-input>
        </el-form-item>

        <el-form-item label="房间标签">
          <el-checkbox-group v-model="hotelForm.tag">
            <el-checkbox-button
              label="消费200 8折"
            ></el-checkbox-button>
            <el-checkbox-button
              label="月租优惠"
            ></el-checkbox-button>
            <el-checkbox-button
              label="学生特价"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="房间简介" prop="desc">
          <el-input type="textarea" v-model="hotelForm.desc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer" >
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleCreate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createHouse} from "@/api/room";

export default {
  name: "InlineEditTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: "success",
        false: "info",
        // deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      isedit: false,
      dialogVisible: false,

      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },

      hotelForm: {
        name: "",
        house_price:'',
        market_price:'',
        area: '',
        livenums:'',
        tag: [],
        image: "",
        desc: "",
      },
    };
  },
  created() {
    // this.getList();
    this.listLoading = true
    fetchList(this.listQuery).then(rep => {
      this.list = rep.data.data

      this.listLoading = false
    })
  },

  methods: {
    handleCreate() {
      console.log(this.hotelForm)

      createHouse(this.hotelForm).then(rep => {

        this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
      })


      this.dialogVisible = false;
    },

    handleUpdate(row, index){
      this.isedit = true
      this.dialogVisible = true

      this.hotelForm = row


      console.log(row, index)

    },
    handleDelete(row, index){
      console.log(row, index)
    },
    
    cancel(){
      this.isedit = false
      this.hotelForm = {
        name: "",
        house_price:'',
        market_price:'',
        area: '',
        livenums:'',
        tag: [],
        image: "",
        desc: "",
      },
      this.dialogVisible = false
    },
    onSubmit() {
      console.log("submit!");
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
