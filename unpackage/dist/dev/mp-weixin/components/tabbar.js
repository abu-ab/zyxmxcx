"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tabbar",
  props: {
    currentPage: Number
  },
  setup(__props) {
    const props = __props;
    const data = common_vendor.reactive({
      tabbarList: [
        {
          pagePath: "/pages/home/index",
          text: "主页",
          iconPath: "../static/home.png",
          selectedIconPath: "../static/selectHome.png"
        },
        {
          pagePath: "/pages/user/index",
          text: "我的",
          iconPath: "../static/my.png",
          selectedIconPath: "../static/selectMy.png"
        }
      ]
    });
    const toScan = function() {
      console.log(23);
      common_vendor.index.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log("扫描二维码成功,结果:" + res.result);
          common_vendor.index.navigateTo({
            url: "/pages/map/index?id=" + res.result
          });
        },
        error: (res) => {
          console.log("扫描二维码出现错误");
        }
      });
    };
    const changeTabbar = function(item) {
      common_vendor.index.switchTab({
        url: item.pagePath
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.index.hideTabBar();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.tabbarList, (item, index, i0) => {
          return {
            a: index == props.currentPage ? item.selectedIconPath : item.iconPath,
            b: common_vendor.t(item.text),
            c: common_vendor.s(index == props.currentPage ? {
              color: "#6cc2c1"
            } : ""),
            d: index,
            e: common_vendor.o(($event) => changeTabbar(item), index)
          };
        }),
        b: common_vendor.o(toScan)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c6a4bdcf"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/components/tabbar.vue"]]);
wx.createComponent(Component);
