"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const formData = common_vendor.reactive({
      senderName: "",
      senderPhone: "",
      senderRegion: "",
      senderAddress: "",
      recipientName: "",
      recipientPhone: "",
      recipientRegion: "",
      recipientAddress: ""
    });
    const submitOrder = () => {
      common_vendor.index.redirectTo({
        url: "/pages/orderList/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: formData.senderName,
        b: common_vendor.o(($event) => formData.senderName = $event.detail.value),
        c: formData.senderPhone,
        d: common_vendor.o(($event) => formData.senderPhone = $event.detail.value),
        e: formData.senderRegion,
        f: common_vendor.o(($event) => formData.senderRegion = $event.detail.value),
        g: formData.senderAddress,
        h: common_vendor.o(($event) => formData.senderAddress = $event.detail.value),
        i: formData.recipientName,
        j: common_vendor.o(($event) => formData.recipientName = $event.detail.value),
        k: formData.recipientPhone,
        l: common_vendor.o(($event) => formData.recipientPhone = $event.detail.value),
        m: formData.recipientRegion,
        n: common_vendor.o(($event) => formData.recipientRegion = $event.detail.value),
        o: formData.recipientAddress,
        p: common_vendor.o(($event) => formData.recipientAddress = $event.detail.value),
        q: common_vendor.o(submitOrder)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ded5722e"], ["__file", "D:/code/zyxmxcx/pages/createOrder/index.vue"]]);
wx.createPage(MiniProgramPage);
