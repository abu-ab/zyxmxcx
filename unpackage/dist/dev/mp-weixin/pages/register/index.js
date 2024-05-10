"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
require("../../utils/http.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const params = common_vendor.ref({
      name: "",
      phone: "",
      password: "",
      surePassword: ""
    });
    const handleRegister = async () => {
      let res = await api_user.registerApi(params.value);
      if (res) {
        common_vendor.index.showToast({
          title: "注册成功",
          "icon": "success"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/login/index"
          });
        }, 1500);
      } else {
        common_vendor.index.showToast({
          title: "注册失败",
          icon: "error"
        });
      }
    };
    const toLogin = () => {
      common_vendor.index.redirectTo({
        url: "/pages/login/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: params.value.name,
        b: common_vendor.o(($event) => params.value.name = $event.detail.value),
        c: params.value.phone,
        d: common_vendor.o(($event) => params.value.phone = $event.detail.value),
        e: params.value.password,
        f: common_vendor.o(($event) => params.value.password = $event.detail.value),
        g: params.value.surePassword,
        h: common_vendor.o(($event) => params.value.surePassword = $event.detail.value),
        i: common_vendor.o(handleRegister),
        j: common_vendor.o(toLogin)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-46a64346"], ["__file", "D:/code/zyxmxcx/pages/register/index.vue"]]);
wx.createPage(MiniProgramPage);
