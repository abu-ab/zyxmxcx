"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const order = common_vendor.reactive({
      createAt: "2024-05-11T10:52:09.000+00:00",
      deliveryTime: null,
      expressCompany: "京东",
      id: "03a97af0dacba1677eeadb7c459c65c2",
      receiverAddress: "测测",
      receiverName: "小红",
      receiverPhone: "19000000000",
      receiverRegion: "天津市,天津城区,和平区",
      senderAddress: "测测",
      senderName: "小绿",
      senderPhone: "18000000000",
      senderRegion: "河北省,石家庄市,长安区",
      shippingTime: null,
      status: "100",
      userId: "557b87b158ff22461e108b54661b8559",
      waybillNumber: "3213123"
    });
    const formatTime = (time) => {
      return new Date(time).toLocaleString();
    };
    const getStatusText = (status) => {
      if (status === "100")
        return "待发货";
      else if (status === "200")
        return "已发货";
      else
        return "未知状态";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(order.id),
        b: common_vendor.t(formatTime(order.createdAt)),
        c: common_vendor.t(order.senderName),
        d: common_vendor.t(order.senderPhone),
        e: common_vendor.t(order.senderRegion),
        f: common_vendor.t(order.senderAddress),
        g: common_vendor.t(order.receiverName),
        h: common_vendor.t(order.receiverPhone),
        i: common_vendor.t(order.receiverRegion),
        j: common_vendor.t(order.receiverAddress),
        k: common_vendor.t(order.expressCompany),
        l: common_vendor.t(order.waybillNumber),
        m: common_vendor.t(getStatusText(order.status)),
        n: order.status === "100" ? 1 : "",
        o: order.status === "200" ? 1 : ""
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3fb8c61c"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/orderDetail/index.vue"]]);
wx.createPage(MiniProgramPage);
