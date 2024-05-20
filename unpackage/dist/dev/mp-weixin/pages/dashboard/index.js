"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts_min = require("../../uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.min.js");
const api_logistics = require("../../api/logistics.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const uChartsInstance = {};
    const cWidth = common_vendor.ref(750);
    const cHeight = common_vendor.ref(500);
    common_vendor.onReady(() => {
      cWidth.value = common_vendor.index.upx2px(750);
      cHeight.value = common_vendor.index.upx2px(500);
      loadOrderList();
    });
    const loadOrderList = async () => {
      let data = await api_logistics.logisticsList({});
      if (data) {
        const statusCount = {
          "待发货": 0,
          "已发货": 0,
          "已完成": 0
        };
        const ordersPerDay = {};
        const senderCities = {};
        const receiverCities = {};
        data.forEach((order) => {
          const date = order.createAt.split("T")[0];
          const senderCity = order.senderRegion.split(",")[1];
          const receiverCity = order.receiverRegion.split(",")[1];
          if (senderCities[senderCity]) {
            senderCities[senderCity]++;
          } else {
            senderCities[senderCity] = 1;
          }
          if (receiverCities[receiverCity]) {
            receiverCities[receiverCity]++;
          } else {
            receiverCities[receiverCity] = 1;
          }
          if (ordersPerDay[date]) {
            ordersPerDay[date]++;
          } else {
            ordersPerDay[date] = 1;
          }
          if (order.status === "100") {
            statusCount["待发货"]++;
          } else if (order.status === "200") {
            statusCount["已发货"]++;
          } else if (order.status === "300") {
            statusCount["已完成"]++;
          }
        });
        const res = {
          categories: ["待发货", "已发货", "已完成"],
          series: [
            {
              name: "订单状态数量",
              data: [statusCount["待发货"], statusCount["已发货"], statusCount["已完成"]]
            }
          ]
        };
        drawCharts("column", res);
        const dates = Object.keys(ordersPerDay).sort();
        const lineRes = {
          categories: dates.map((date) => {
            const d = new Date(date);
            return `${d.getMonth() + 1}-${d.getDate()}`;
          }),
          series: [{
            name: "每日订单数量",
            data: dates.map((date) => ordersPerDay[date])
          }]
        };
        initBarChart("column1", lineRes);
        const senderCityData = Object.entries(senderCities).map(([city, count]) => ({ name: city, value: count }));
        console.log(senderCityData);
        pipeChart("column2", senderCityData);
        const receiverCityData = Object.entries(receiverCities).map(([city, count]) => ({ name: city, value: count }));
        pipeChart("column3", receiverCityData);
      }
    };
    const drawCharts = (id, data) => {
      const ctx = common_vendor.index.createCanvasContext(id, this);
      uChartsInstance[id] = new uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts_min.uCharts({
        type: "column",
        context: ctx,
        width: cWidth.value,
        height: cHeight.value,
        categories: data.categories,
        series: data.series,
        animation: true,
        background: "#FFFFFF",
        padding: [15, 15, 0, 5],
        xAxis: {
          disableGrid: false
        },
        yAxis: {
          data: [{ min: 0 }]
        },
        extra: {
          column: {
            type: "group"
          }
        }
      });
    };
    const initBarChart = (id, data) => {
      const ctx = common_vendor.index.createCanvasContext(id, this);
      uChartsInstance[id] = new uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts_min.uCharts({
        type: "line",
        context: ctx,
        width: cWidth.value,
        height: cHeight.value,
        categories: data.categories,
        series: data.series,
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "数量",
          dashLength: 2
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow"
          }
        }
      });
    };
    const pipeChart = (id, data) => {
      const ctx = common_vendor.index.createCanvasContext(id, this);
      uChartsInstance[id] = new uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts_min.uCharts({
        type: "pie",
        context: ctx,
        width: cWidth.value,
        height: cHeight.value,
        series: [{ name: "城市", data }],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            linearType: "custom"
          }
        }
      });
    };
    const tap = (e) => {
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(tap),
        b: common_vendor.o(tap),
        c: common_vendor.o(tap),
        d: common_vendor.o(tap)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a869e244"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/dashboard/index.vue"]]);
wx.createPage(MiniProgramPage);
