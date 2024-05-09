"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  tabbar();
}
const tabbar = () => "../../components/tabbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const scale = common_vendor.ref(7);
    const latitude = common_vendor.ref(39.909);
    const longitude = common_vendor.ref(116.39742);
    const covers = common_vendor.ref([
      {
        latitude: 39.909,
        longitude: 116.39742,
        height: 20,
        width: 20,
        id: 1
      },
      {
        latitude: 39.9,
        longitude: 116.39,
        height: 20,
        width: 20,
        id: 2
      }
    ]);
    const polyline = common_vendor.ref([
      {
        points: [
          {
            latitude: 39.909,
            longitude: 116.39742
          },
          {
            latitude: 39.9,
            longitude: 116.39
          }
        ],
        color: "#FF0000DD",
        width: 2,
        dottedLine: true
      }
    ]);
    common_vendor.ref(false);
    const handleMapTap = (event) => {
      console.log(event);
      const { latitude: latitude2, longitude: longitude2 } = event.detail;
      console.log("latitude", latitude2, "longitude", longitude2);
      covers.value.push({
        latitude: latitude2,
        longitude: longitude2,
        height: 20,
        width: 20,
        id: covers.value.length + 1
      });
      polyline.value[0].points.push({
        latitude: latitude2,
        longitude: longitude2
      });
    };
    return (_ctx, _cache) => {
      return {
        a: longitude.value,
        b: latitude.value,
        c: covers.value,
        d: polyline.value,
        e: scale.value,
        f: common_vendor.o(handleMapTap),
        g: common_vendor.p({
          currentPage: 0
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "D:/code/zyxmxcx/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
