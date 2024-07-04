"use strict";
const common_vendor = require("../../common/vendor.js");
const api_logistics = require("../../api/logistics.js");
const api_qrcode = require("../../api/qrcode.js");
const utils_utils = require("../../utils/utils.js");
if (!Math) {
  myMap();
}
const myMap = () => "../map/index2.js";
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
    const confirm = () => {
      common_vendor.index.showModal({
        title: "是否确认订单",
        success: async (e) => {
          if (e.confirm) {
            let res = await api_logistics.confirmOrderStatus(order.value.id);
            if (res) {
              loadDetail(order.value.id);
            }
          }
        }
      });
    };
    const loadDetail = async (id) => {
      let res = await api_logistics.logistDetail(id);
      console.log(res);
      order.value = res;
      let code = await api_qrcode.getQRCode(id);
      console.log("code", code);
      if (typeof code === "boolean") {
        qrcode.value = `http://139.9.198.139:8081/images/${id}.png`;
      }
      common_vendor.index.stopPullDownRefresh();
    };
    common_vendor.onPullDownRefresh(() => {
      loadDetail(order.value.id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          noFull: true
        }),
        b: common_vendor.t(common_vendor.unref(order).id),
        c: common_vendor.t(common_vendor.unref(utils_utils.getStatusText)(common_vendor.unref(order).status)),
        d: common_vendor.unref(order).status === "100" ? 1 : "",
        e: common_vendor.unref(order).status === "200" ? 1 : "",
        f: common_vendor.t(common_vendor.unref(utils_utils.formatTime)(common_vendor.unref(order).createAt)),
        g: common_vendor.t(common_vendor.unref(order).senderName),
        h: common_vendor.t(common_vendor.unref(order).senderPhone),
        i: common_vendor.t(common_vendor.unref(order).senderRegion.split(",").join(" ")),
        j: common_vendor.t(common_vendor.unref(order).senderAddress),
        k: common_vendor.t(common_vendor.unref(order).receiverName),
        l: common_vendor.t(common_vendor.unref(order).receiverPhone),
        m: common_vendor.t(common_vendor.unref(order).receiverRegion.split(",").join(" ")),
        n: common_vendor.t(common_vendor.unref(order).receiverAddress),
        o: common_vendor.t(common_vendor.unref(order).expressCompany),
        p: common_vendor.t(common_vendor.unref(order).waybillNumber),
        q: common_vendor.t(common_vendor.unref(order).shippingTime ? common_vendor.unref(utils_utils.formatTime)(common_vendor.unref(order).shippingTime) : "暂未发货"),
        r: common_vendor.t(common_vendor.unref(order).deliveryTime ? common_vendor.unref(utils_utils.formatTime)(common_vendor.unref(order).deliveryTime) : "暂未收货"),
        s: common_vendor.unref(order).status == "200"
      }, common_vendor.unref(order).status == "200" ? {
        t: common_vendor.o(confirm)
      } : {}, {
        v: qrcode.value
      }, qrcode.value ? {
        w: qrcode.value
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3fb8c61c"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/orderDetail/index.vue"]]);
wx.createPage(MiniProgramPage);
