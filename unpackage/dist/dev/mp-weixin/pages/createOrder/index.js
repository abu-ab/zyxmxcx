"use strict";
const common_vendor = require("../../common/vendor.js");
const api_region = require("../../api/region.js");
const api_logistics = require("../../api/logistics.js");
if (!Math) {
  (regionPicker + popupBottom)();
}
const regionPicker = () => "../../components/regionPicker.js";
const popupBottom = () => "../../components/px-popup-bottom/px-popup-bottom.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const popupVisible = common_vendor.ref(false);
    const popup = common_vendor.ref();
    const regionList = common_vendor.ref([]);
    const formData = common_vendor.reactive({
      senderName: "",
      senderPhone: "",
      senderRegion: [],
      senderAddress: "",
      receiverPhone: "",
      receiverRegion: [],
      receiverAddress: "",
      receiverName: "",
      expressCompany: "",
      waybillNumber: ""
    });
    const changeRegion = (item, key) => {
      formData[key] = item;
    };
    const submitOrder = async () => {
      const params = JSON.parse(JSON.stringify(formData));
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      params.senderRegion = params.senderRegion.join(",");
      params.receiverRegion = params.receiverRegion.join(",");
      params.userId = userInfo.id;
      console.log(params);
      let res = await api_logistics.createLogistics(params);
      if (typeof res == "boolean") {
        common_vendor.index.redirectTo({
          url: "/pages/orderList/index"
        });
      }
    };
    const addressBoook = () => {
      console.log(123123);
      popupVisible.value = true;
      popup.value.setContViewHeight();
    };
    common_vendor.onMounted(async () => {
      let res = await api_region.getRegionList();
      regionList.value = res;
      console.log(res);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(addressBoook),
        b: formData.senderName,
        c: common_vendor.o(($event) => formData.senderName = $event.detail.value),
        d: formData.senderPhone,
        e: common_vendor.o(($event) => formData.senderPhone = $event.detail.value),
        f: common_vendor.p({
          regionList: regionList.value,
          defaultValue: formData.senderRegion,
          change: changeRegion,
          keyValue: "senderRegion"
        }),
        g: formData.senderAddress,
        h: common_vendor.o(($event) => formData.senderAddress = $event.detail.value),
        i: formData.receiverName,
        j: common_vendor.o(($event) => formData.receiverName = $event.detail.value),
        k: formData.receiverPhone,
        l: common_vendor.o(($event) => formData.receiverPhone = $event.detail.value),
        m: common_vendor.p({
          regionList: regionList.value,
          defaultValue: formData.receiverRegion,
          change: changeRegion,
          keyValue: "receiverRegion"
        }),
        n: formData.receiverAddress,
        o: common_vendor.o(($event) => formData.receiverAddress = $event.detail.value),
        p: formData.expressCompany,
        q: common_vendor.o(($event) => formData.expressCompany = $event.detail.value),
        r: formData.waybillNumber,
        s: common_vendor.o(($event) => formData.waybillNumber = $event.detail.value),
        t: common_vendor.o(submitOrder),
        v: common_vendor.sr(popup, "ded5722e-2", {
          "k": "popup"
        }),
        w: common_vendor.o(_ctx.onClose),
        x: common_vendor.o(_ctx.onPopupReachBottom),
        y: common_vendor.o(($event) => popupVisible.value = $event),
        z: common_vendor.p({
          title: "标题",
          radius: "40",
          maxHeight: "900",
          visible: popupVisible.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ded5722e"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/createOrder/index.vue"]]);
wx.createPage(MiniProgramPage);
