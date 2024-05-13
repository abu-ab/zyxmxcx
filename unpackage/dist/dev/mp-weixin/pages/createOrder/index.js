"use strict";
const common_vendor = require("../../common/vendor.js");
const api_region = require("../../api/region.js");
const api_logistics = require("../../api/logistics.js");
require("../../utils/http.js");
if (!Math) {
  regionPicker();
}
const regionPicker = () => "../../components/regionPicker.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
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
    common_vendor.onMounted(async () => {
      let res = await api_region.getRegionList();
      regionList.value = res;
      console.log(res);
    });
    return (_ctx, _cache) => {
      return {
        a: formData.senderName,
        b: common_vendor.o(($event) => formData.senderName = $event.detail.value),
        c: formData.senderPhone,
        d: common_vendor.o(($event) => formData.senderPhone = $event.detail.value),
        e: common_vendor.p({
          regionList: regionList.value,
          defaultValue: formData.senderRegion,
          change: changeRegion,
          keyValue: "senderRegion"
        }),
        f: formData.senderAddress,
        g: common_vendor.o(($event) => formData.senderAddress = $event.detail.value),
        h: formData.receiverName,
        i: common_vendor.o(($event) => formData.receiverName = $event.detail.value),
        j: formData.receiverPhone,
        k: common_vendor.o(($event) => formData.receiverPhone = $event.detail.value),
        l: common_vendor.p({
          regionList: regionList.value,
          defaultValue: formData.receiverRegion,
          change: changeRegion,
          keyValue: "receiverRegion"
        }),
        m: formData.receiverAddress,
        n: common_vendor.o(($event) => formData.receiverAddress = $event.detail.value),
        o: formData.expressCompany,
        p: common_vendor.o(($event) => formData.expressCompany = $event.detail.value),
        q: formData.waybillNumber,
        r: common_vendor.o(($event) => formData.waybillNumber = $event.detail.value),
        s: common_vendor.o(submitOrder)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ded5722e"], ["__file", "D:/code/zyxmxcx/pages/createOrder/index.vue"]]);
wx.createPage(MiniProgramPage);
