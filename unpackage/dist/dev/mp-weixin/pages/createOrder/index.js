"use strict";
const common_vendor = require("../../common/vendor.js");
const api_region = require("../../api/region.js");
const api_logistics = require("../../api/logistics.js");
const api_addressApi = require("../../api/addressApi.js");
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
    const formData = common_vendor.ref({
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
    const addressLists = common_vendor.ref([]);
    const type = common_vendor.ref("");
    const changeRegion = (item, key) => {
      formData.value[key] = item;
    };
    const submitOrder = async () => {
      const params = JSON.parse(JSON.stringify(formData.value));
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
    const addressBoook = (item) => {
      console.log(123123);
      type.value = item;
      popupVisible.value = true;
      popup.value.setContViewHeight();
    };
    const loadAddressList = async () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      let res = await api_addressApi.addressList({ userId: userInfo.id });
      if (res) {
        console.log(res);
        addressLists.value = res;
      }
    };
    const addAddress = (item) => {
      console.log(item);
      if (type.value === "sender") {
        formData.value.senderName = item.recipientName;
        formData.value.senderPhone = item.phoneNumber;
        formData.value.senderRegion = [item.province, item.city, item.district];
        formData.value.senderAddress = item.addressLine;
      } else if (type.value === "receiver") {
        formData.value.receiverName = item.recipientName;
        formData.value.receiverPhone = item.phoneNumber;
        formData.value.receiverRegion = [item.province, item.city, item.district];
        formData.value.receiverAddress = item.addressLine;
      }
      popupVisible.value = false;
    };
    common_vendor.onMounted(async () => {
      let res = await api_region.getRegionList();
      regionList.value = res;
      loadAddressList();
      console.log(res);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => addressBoook("sender")),
        b: formData.value.senderName,
        c: common_vendor.o(($event) => formData.value.senderName = $event.detail.value),
        d: formData.value.senderPhone,
        e: common_vendor.o(($event) => formData.value.senderPhone = $event.detail.value),
        f: common_vendor.p({
          regionList: regionList.value,
          defaultValue: formData.value.senderRegion,
          change: changeRegion,
          keyValue: "senderRegion"
        }),
        g: formData.value.senderAddress,
        h: common_vendor.o(($event) => formData.value.senderAddress = $event.detail.value),
        i: common_vendor.o(($event) => addressBoook("receiver")),
        j: formData.value.receiverName,
        k: common_vendor.o(($event) => formData.value.receiverName = $event.detail.value),
        l: formData.value.receiverPhone,
        m: common_vendor.o(($event) => formData.value.receiverPhone = $event.detail.value),
        n: common_vendor.p({
          regionList: regionList.value,
          defaultValue: formData.value.receiverRegion,
          change: changeRegion,
          keyValue: "receiverRegion"
        }),
        o: formData.value.receiverAddress,
        p: common_vendor.o(($event) => formData.value.receiverAddress = $event.detail.value),
        q: formData.value.expressCompany,
        r: common_vendor.o(($event) => formData.value.expressCompany = $event.detail.value),
        s: formData.value.waybillNumber,
        t: common_vendor.o(($event) => formData.value.waybillNumber = $event.detail.value),
        v: common_vendor.o(submitOrder),
        w: common_vendor.f(addressLists.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.recipientName),
            b: common_vendor.t(item.phoneNumber),
            c: common_vendor.t(item.province),
            d: common_vendor.t(item.city),
            e: common_vendor.t(item.district),
            f: common_vendor.t(item.addressLine),
            g: index,
            h: common_vendor.o(($event) => addAddress(item), index)
          };
        }),
        x: common_vendor.sr(popup, "ded5722e-2", {
          "k": "popup"
        }),
        y: common_vendor.o(_ctx.onClose),
        z: common_vendor.o(_ctx.onPopupReachBottom),
        A: common_vendor.o(($event) => popupVisible.value = $event),
        B: common_vendor.p({
          title: "请选择地址",
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
