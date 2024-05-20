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
    const del = async (id) => {
      common_vendor.index.showModal({
        title: "确认是否删除地址",
        success: async (e) => {
          if (e.confirm) {
            let res = await api_addressApi.deleteAddress(id);
            if (res) {
              loadList();
            }
          }
        }
      });
    };
    const loadList = async () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      let res = await api_addressApi.addressList({ userId: userInfo.id });
      if (res) {
        console.log(res);
        list.value = res;
        console.log(list);
      }
    };
    common_vendor.onShow(async () => {
      loadList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(list).length == 0
      }, common_vendor.unref(list).length == 0 ? {} : {}, {
        b: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return {
            a: common_vendor.t(item.recipientName),
            b: common_vendor.t(item.phoneNumber),
            c: common_vendor.t(item.province),
            d: common_vendor.t(item.city),
            e: common_vendor.t(item.district),
            f: common_vendor.t(item.addressLine),
            g: common_vendor.o(($event) => edit(item.id), index),
            h: common_vendor.o(($event) => del(item.id), index),
            i: index
          };
        }),
        c: common_vendor.o(add)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-960a3348"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/addressList/index.vue"]]);
wx.createPage(MiniProgramPage);
