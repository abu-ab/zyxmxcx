"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_utils = require("../../utils/utils.js");
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
      const userInfo2 = common_vendor.index.getStorageSync("userInfo");
      if (userInfo2 && userInfo2.id) {
        common_vendor.index.navigateTo({
          url
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/index"
        });
      }
    };
    const logout = () => {
      common_vendor.index.setStorageSync("userInfo", {});
      userInfo.value = {};
      common_vendor.index.switchTab({
        url: "/pages/home/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value && userInfo.value.id
      }, userInfo.value && userInfo.value.id ? {
        b: common_vendor.t(userInfo.value.name),
        c: common_vendor.t(userInfo.value.phone),
        d: common_vendor.o(($event) => navigate("/pages/myqrcode/index"))
      } : {
        e: common_vendor.o(($event) => navigate("/pages/login/index"))
      }, {
        f: common_vendor.o(($event) => navigate("/pages/orderList/index")),
        g: common_vendor.o(($event) => navigate("/pages/addressList/index")),
        h: common_vendor.unref(utils_utils.checkRole)("admin")
      }, common_vendor.unref(utils_utils.checkRole)("admin") ? {
        i: common_vendor.o(($event) => navigate("/pages/userList/index"))
      } : {}, {
        j: common_vendor.unref(utils_utils.checkRole)("admin")
      }, common_vendor.unref(utils_utils.checkRole)("admin") ? {
        k: common_vendor.o(($event) => navigate("/pages/dashboard/index"))
      } : {}, {
        l: common_vendor.o(logout),
        m: common_vendor.p({
          currentPage: 1
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79e6a490"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
