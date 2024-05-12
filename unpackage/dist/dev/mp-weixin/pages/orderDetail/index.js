"use strict";
const common_vendor = require("../../common/vendor.js");
const api_logistics = require("../../api/logistics.js");
const api_qrcode = require("../../api/qrcode.js");
require("../../utils/http.js");
if (!Math) {
  myMap();
}
const myMap = () => "../map/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let order = common_vendor.ref({
      createAt: null,
      deliveryTime: null,
      expressCompany: "",
      id: "",
      receiverAddress: "",
      receiverName: "",
      receiverPhone: "",
      receiverRegion: "",
      senderAddress: "",
      senderName: "",
      senderPhone: "",
      senderRegion: "",
      shippingTime: null,
      status: "",
      userId: "",
      waybillNumber: ""
    });
    const qrcode = common_vendor.ref("");
    common_vendor.onLoad((e) => {
      console.log(e);
      const id = e.id;
      loadDetail(id);
    });
    const loadDetail = async (id) => {
      let res = await api_logistics.logistDetail(id);
      console.log(res);
      order.value = res;
      let code = await api_qrcode.getQRCode(id);
      console.log("code", code);
      if (typeof code === "boolean") {
        qrcode.value = `http://139.9.198.139:8081/images/${id}.png`;
      }
    };
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
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(order).id),
        b: common_vendor.t(getStatusText(common_vendor.unref(order).status)),
        c: common_vendor.unref(order).status === "100" ? 1 : "",
        d: common_vendor.unref(order).status === "200" ? 1 : "",
        e: common_vendor.t(formatTime(common_vendor.unref(order).createAt)),
        f: common_vendor.t(common_vendor.unref(order).senderName),
        g: common_vendor.t(common_vendor.unref(order).senderPhone),
        h: common_vendor.t(common_vendor.unref(order).senderRegion.split(",").join(" ")),
        i: common_vendor.t(common_vendor.unref(order).senderAddress),
        j: common_vendor.t(common_vendor.unref(order).receiverName),
        k: common_vendor.t(common_vendor.unref(order).receiverPhone),
        l: common_vendor.t(common_vendor.unref(order).receiverRegion.split(",").join(" ")),
        m: common_vendor.t(common_vendor.unref(order).receiverAddress),
        n: common_vendor.t(common_vendor.unref(order).expressCompany),
        o: common_vendor.t(common_vendor.unref(order).waybillNumber),
        p: common_vendor.t(common_vendor.unref(order).shippingTime ? formatTime(common_vendor.unref(order).shippingTime) : "暂未发货"),
        q: common_vendor.t(common_vendor.unref(order).deliveryTime ? formatTime(common_vendor.unref(order).deliveryTime) : "暂未收货"),
        r: qrcode.value
      }, qrcode.value ? {
        s: qrcode.value
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3fb8c61c"], ["__file", "D:/code/zyxmxcx/pages/orderDetail/index.vue"]]);
wx.createPage(MiniProgramPage);
