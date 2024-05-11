"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  tabbar();
}
const tabbar = () => "../../components/tabbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo"));
    common_vendor.onShow(() => {
      userInfo.value = common_vendor.index.getStorageSync("userInfo");
    });
    const navigate = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const logout = () => {
      common_vendor.index.setStorageSync("userInfo", {});
      userInfo.value = {};
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value && userInfo.value.id
      }, userInfo.value && userInfo.value.id ? {
        b: common_vendor.o(($event) => navigate("/pages/myqrcode/index"))
      } : {
        c: common_vendor.o(($event) => navigate("/pages/login/index"))
      }, {
        d: common_vendor.o(($event) => navigate("/pages/orderList/index")),
        e: common_vendor.o(($event) => navigate("/pages/addressList/index")),
        f: common_vendor.o(logout),
        g: common_vendor.p({
          currentPage: 1
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79e6a490"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
