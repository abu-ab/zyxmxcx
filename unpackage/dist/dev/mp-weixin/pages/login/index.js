"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const phone = common_vendor.ref("");
    const password = common_vendor.ref("");
    const handleLogin = () => {
      console.log("手机号:", phone.value, "密码:", password.value);
    };
    const toRegister = () => {
      console.log("跳转到注册页面");
      common_vendor.index.redirectTo({
        url: "/pages/register/index"
      });
    };
    common_vendor.index.request({
      url: "http://139.9.198.139:8081/hello?name=lisi",
      method: "GET",
      // HTTP 请求方法，可以是 GET、POST 等
      data: {},
      // 请求参数，如果是 GET 请求，可以将参数拼接到 URL 中
      header: {},
      // 请求头部信息
      success: (res) => {
        console.log(res.data);
      },
      fail: (err) => {
        console.error(err);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: phone.value,
        b: common_vendor.o(($event) => phone.value = $event.detail.value),
        c: password.value,
        d: common_vendor.o(($event) => password.value = $event.detail.value),
        e: common_vendor.o(handleLogin),
        f: common_vendor.o(toRegister)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
