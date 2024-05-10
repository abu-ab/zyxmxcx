"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/login/index.js";
  "./pages/register/index.js";
  "./pages/user/index.js";
  "./pages/userList/index.js";
  "./pages/userDetail/index.js";
  "./pages/myqrcode/index.js";
  "./pages/orderList/index.js";
  "./pages/orderDetail/index.js";
  "./pages/createOrder/index.js";
  "./pages/addressList/index.js";
  "./pages/editAddress/index.js";
  "./pages/dashboard/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
