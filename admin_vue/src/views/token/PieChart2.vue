<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { getTokenList } from "@/api/token";

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      getTokenList().then((res) => {
        console.log(res)
        let field = [];
        let piedata = [];
        res.forEach((element) => {
          field.push(element.key);
          piedata.push({
            name: element.key,
            value: element.value,
          });
        });

        console.log(piedata);
        
        this.chart.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            left: "center",
            bottom: "10",
            data: field,
          },
          series: [
            {
              name: "WEEKLY WRITE ARTICLES",
              type: "pie",
              roseType: "radius",
              radius: [15, 95],
              center: ["47%", "38%"],
              data: piedata,
              animationEasing: "cubicInOut",
              animationDuration: 2600,
            },
          ],
        });
      });
    },
  },
};
</script>
