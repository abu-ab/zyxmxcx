"use strict";
const common_vendor = require("../../common/vendor.js");
const api_addressApi = require("../../api/addressApi.js");
const api_region = require("../../api/region.js");
if (!Math) {
  regionPicker();
}
const regionPicker = () => "../../components/regionPicker.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const regionList = common_vendor.ref([]);
    let address = common_vendor.ref({
      id: "",
      userId: "",
      recipientName: "",
      phoneNumber: "",
      address: "",
      addressLine: "",
      province: "",
      city: "",
      district: "",
      isDefault: 0
    });
    const changeRegion = (item, key) => {
      address.value[key] = item;
    };
    const switchChange = (e) => {
      console.log(e.detail.value);
      address.value.isDefault = e.detail.value ? 1 : 0;
    };
    const load = async (id) => {
      let res = await api_addressApi.addressDetail(id);
      if (res) {
        res.address = [res.province, res.city, res.district];
        console.log(res.address);
        address.value = res;
        console.log(address.value);
      }
    };
    const save = async () => {
      let params = JSON.parse(JSON.stringify(address.value));
      console.log(params);
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      params.userId = userInfo.id;
      params.province = params.address[0];
      params.city = params.address[1];
      params.district = params.address[2];
      let res;
      if (params.id) {
        res = await api_addressApi.updateAddress(params);
      } else {
        res = await api_addressApi.createAddress(params);
      }
      if (res) {
        common_vendor.index.navigateBack();
      }
    };
    common_vendor.onLoad(async (e) => {
      if (e.id) {
        await load(e.id);
      }
      let res = await api_region.getRegionList();
      regionList.value = res;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(address).recipientName,
        b: common_vendor.o(($event) => common_vendor.unref(address).recipientName = $event.detail.value),
        c: common_vendor.unref(address).phoneNumber,
        d: common_vendor.o(($event) => common_vendor.unref(address).phoneNumber = $event.detail.value),
        e: common_vendor.p({
          regionList: regionList.value,
          defaultValue: common_vendor.unref(address).address,
          change: changeRegion,
          keyValue: "address"
        }),
        f: common_vendor.unref(address).addressLine,
        g: common_vendor.o(($event) => common_vendor.unref(address).addressLine = $event.detail.value),
        h: common_vendor.o(switchChange),
        i: common_vendor.o(save)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80fabdbe"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/editAddress/index.vue"]]);
wx.createPage(MiniProgramPage);
