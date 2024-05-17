"use strict";
const common_vendor = require("../../common/vendor.js");
const api_logistics = require("../../api/logistics.js");
const utils_utils = require("../../utils/utils.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const list = common_vendor.ref([]);
    const deleteOrder = async (id) => {
      common_vendor.index.showModal({
        title: "确认是否删除订单",
        success: async (e) => {
          if (e.confirm) {
            let res = await api_logistics.deleteLogist(id);
            if (res) {
              loadList();
            }
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
    const toDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/orderDetail/index?id=${id}`
      });
    };
    common_vendor.onMounted(async () => {
      loadList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(utils_utils.formatTime)(item.createAt)),
            b: common_vendor.t(item.senderName),
            c: common_vendor.t(item.senderRegion.split(",")[0]),
            d: common_vendor.t(common_vendor.unref(utils_utils.getStatusText)(item.status)),
            e: common_vendor.t(item.receiverName),
            f: common_vendor.t(item.receiverRegion.split(",")[0]),
            g: common_vendor.o(($event) => deleteOrder(item.id), index),
            h: index,
            i: common_vendor.o(($event) => toDetail(item.id), index)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-517e59ee"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/orderList/index.vue"]]);
wx.createPage(MiniProgramPage);
