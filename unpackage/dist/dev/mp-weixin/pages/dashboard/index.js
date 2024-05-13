"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts_min = require("../../uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.min.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const uChartsInstance = {};
    const cWidth = common_vendor.ref(750);
    const cHeight = common_vendor.ref(500);
    common_vendor.onReady(() => {
      cWidth.value = common_vendor.index.upx2px(750);
      cHeight.value = common_vendor.index.upx2px(500);
      getServerData();
    });
    const getServerData = () => {
      setTimeout(() => {
        let res = {
          categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
          series: [
            {
              name: "目标值",
              data: [35, 36, 31, 33, 13, 34]
            },
            {
              name: "完成量",
              data: [18, 27, 21, 24, 6, 28]
            }
          ]
        };
        drawCharts("column", res);
      }, 500);
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
          disableGrid: true
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
    const tap = (e) => {
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(tap)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a869e244"], ["__file", "D:/code/zyxmxcx/pages/dashboard/index.vue"]]);
wx.createPage(MiniProgramPage);
