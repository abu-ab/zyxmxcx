"use strict";
const common_vendor = require("../../common/vendor.js");
const api_addressApi = require("../../api/addressApi.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let list = common_vendor.ref([]);
    const edit = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/editAddress/index?id=${id}`
      });
    };
    const add = () => {
      common_vendor.index.navigateTo({
        url: "/pages/editAddress/index"
      });
    };
    common_vendor.onShow(async () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      let res = await api_addressApi.addressList(userInfo.id);
      if (res) {
        console.log(res);
        list.value = res;
        console.log(list);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return common_vendor.e({
            a: item.isDefault
          }, item.isDefault ? {} : {}, {
            b: common_vendor.t(item.recipientName),
            c: common_vendor.t(item.phoneNumber),
            d: common_vendor.t(item.province),
            e: common_vendor.t(item.city),
            f: common_vendor.t(item.district),
            g: common_vendor.t(item.addressLine),
            h: item.isDefault ? "36px" : "8px",
            i: common_vendor.o(($event) => edit(item.id), index),
            j: index
          });
        }),
        b: common_vendor.o(add)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-960a3348"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/addressList/index.vue"]]);
wx.createPage(MiniProgramPage);
