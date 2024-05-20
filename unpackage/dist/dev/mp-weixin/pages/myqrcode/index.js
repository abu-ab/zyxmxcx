"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_utils = require("../../utils/utils.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const user = common_vendor.ref({});
    common_vendor.onShow(() => {
      user.value = common_vendor.index.getStorageSync("userInfo");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.value.name),
        b: common_vendor.t(user.value.phone),
        c: common_vendor.t(common_vendor.unref(utils_utils.formatTime)(user.value.createAt)),
        d: common_vendor.t(common_vendor.unref(utils_utils.handleRole)(user.value.role))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b4bd26a"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/myqrcode/index.vue"]]);
wx.createPage(MiniProgramPage);
