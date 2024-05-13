"use strict";
const common_vendor = require("../../common/vendor.js");
const api_txApi = require("../../api/txApi.js");
if (!Math) {
  tabbar();
}
const tabbar = () => "../../components/tabbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const search = common_vendor.ref({
      start: "",
      end: ""
    });
    const createOrder = () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.id) {
        common_vendor.index.navigateTo({
          url: "/pages/createOrder/index"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/index"
        });
      }
    };
    const orderList = () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.id) {
        common_vendor.index.navigateTo({
          url: "/pages/orderList/index"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/index"
        });
      }
    };
    const compute = async () => {
      if (!search.value.start) {
        common_vendor.index.showToast({
          icon: "none",
          title: "开始地址不能为空"
        });
        return;
      }
      if (!search.value.end) {
        common_vendor.index.showToast({
          icon: "none",
          title: "结束地址不能为空"
        });
        return;
      }
      let start = await api_txApi.getAddress(search.value.start);
      let end = await api_txApi.getAddress(search.value.end);
      const startLocation = start.result.location;
      const endLocation = end.result.location;
      const distance = haversineDistance(startLocation.lat, startLocation.lng, endLocation.lat, endLocation.lng);
      console.log(start);
      console.log(end);
      console.log(distance);
      common_vendor.index.showModal({
        content: `${search.value.start}和${search.value.end}的距离为：${distance.toFixed(2)}公里
			运费为：${(distance * 0.3).toFixed(2)}元`
      });
    };
    function haversineDistance(lat1, lon1, lat2, lon2) {
      function toRad(degrees) {
        return degrees * Math.PI / 180;
      }
      var R = 6371;
      var dLat = toRad(lat2 - lat1);
      var dLon = toRad(lon2 - lon1);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = R * c;
      return distance;
    }
    return (_ctx, _cache) => {
      return {
        a: search.value.start,
        b: common_vendor.o(($event) => search.value.start = $event.detail.value),
        c: search.value.end,
        d: common_vendor.o(($event) => search.value.end = $event.detail.value),
        e: common_vendor.o(compute),
        f: common_vendor.o(createOrder),
        g: common_vendor.o(orderList),
        h: common_vendor.p({
          currentPage: 0
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
