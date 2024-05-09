"use strict";
const common_vendor = require("../../common/vendor.js");
const api_region = require("../../api/region.js");
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
    const regionList = common_vendor.ref([]);
    const changeRegion = () => {
      console.log(123);
    };
    const submitOrder = () => {
      common_vendor.index.redirectTo({
        url: "/pages/orderList/index"
      });
    };
    common_vendor.onMounted(async () => {
      let res = await api_region.getRegionList();
      regionList.value = res;
      console.log(res);
    });
    return (_ctx, _cache) => {
      var _a;
      return {
        a: formData.senderName,
        b: common_vendor.o(($event) => formData.senderName = $event.detail.value),
        c: formData.senderPhone,
        d: common_vendor.o(($event) => formData.senderPhone = $event.detail.value),
        e: common_vendor.t((_a = regionList.value[0]) == null ? void 0 : _a.name),
        f: formData.senderRegion,
        g: common_vendor.o(changeRegion),
        h: common_vendor.o(
          //@ts-ignore
          (...args) => _ctx.columnchange && _ctx.columnchange(...args)
        ),
        i: regionList.value,
        j: formData.senderAddress,
        k: common_vendor.o(($event) => formData.senderAddress = $event.detail.value),
        l: formData.recipientName,
        m: common_vendor.o(($event) => formData.recipientName = $event.detail.value),
        n: formData.recipientPhone,
        o: common_vendor.o(($event) => formData.recipientPhone = $event.detail.value),
        p: formData.recipientRegion,
        q: common_vendor.o(changeRegion),
        r: formData.recipientAddress,
        s: common_vendor.o(($event) => formData.recipientAddress = $event.detail.value),
        t: common_vendor.o(submitOrder)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ded5722e"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/createOrder/index.vue"]]);
wx.createPage(MiniProgramPage);
