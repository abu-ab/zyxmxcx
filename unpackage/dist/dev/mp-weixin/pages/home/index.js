"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  tabbar();
}
const tabbar = () => "../../components/tabbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const search = common_vendor.reactive({
      start: "",
      end: ""
    });
    const createOrder = () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.id) {
        common_vendor.index.navigateTo({
          url: "/pages/createOrder/index"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: search.start,
        b: common_vendor.o(($event) => search.start = $event.detail.value),
        c: search.end,
        d: common_vendor.o(($event) => search.end = $event.detail.value),
        e: common_vendor.o(createOrder),
        f: common_vendor.p({
          currentPage: 0
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "D:/code/zyxmxcx/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
