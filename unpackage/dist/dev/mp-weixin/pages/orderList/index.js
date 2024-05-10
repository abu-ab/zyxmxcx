"use strict";
const common_vendor = require("../../common/vendor.js");
const api_logistics = require("../../api/logistics.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const list = common_vendor.ref([]);
    const deleteOrder = async (id) => {
      common_vendor.index.showModal({
        title: "确认是否删除订单",
        success: async () => {
          let res = await api_logistics.deleteLogist(id);
          if (res) {
            loadList();
          }
        }
      });
    };
    const loadList = async () => {
      let res = await api_logistics.logisticsList({});
      if (res) {
        list.value = res;
      }
    };
    common_vendor.onMounted(async () => {
      loadList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.senderName),
            b: common_vendor.t(item.senderRegion.split(",")[0]),
            c: common_vendor.t(item.receiverName),
            d: common_vendor.t(item.receiverRegion.split(",")[0]),
            e: common_vendor.o(($event) => deleteOrder(item.id), index),
            f: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-517e59ee"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/orderList/index.vue"]]);
wx.createPage(MiniProgramPage);
