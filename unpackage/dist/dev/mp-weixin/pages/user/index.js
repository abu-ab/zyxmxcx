"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  tabbar();
}
const tabbar = () => "../../components/tabbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const navigate = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => navigate("/pages/myqrcode/index")),
        b: common_vendor.o(($event) => navigate("/pages/orderList/index")),
        c: common_vendor.o(($event) => navigate("/pages/addressList/index")),
        d: common_vendor.p({
          currentPage: 1
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79e6a490"], ["__file", "D:/code/zyxmxcx/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
