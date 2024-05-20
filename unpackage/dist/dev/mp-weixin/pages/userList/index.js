"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const utils_utils = require("../../utils/utils.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const list = common_vendor.ref([]);
    const loadList = async () => {
      let res = await api_user.userList();
      if (res) {
        console.log(res);
        list.value = res;
      }
    };
    const onRoleChange = async (e, item) => {
      const index = e.detail.value;
      const cur = utils_utils.roleMap[index];
      console.log(cur, item);
      item.role = cur.value;
      let res = await api_user.updateUser(item);
      if (res) {
        common_vendor.index.showToast({
          title: "角色修改成功",
          icon: "success"
        });
        loadList();
      }
    };
    common_vendor.onMounted(() => {
      loadList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: common_vendor.t(common_vendor.unref(utils_utils.formatTime)(item.createAt)),
            d: common_vendor.t(common_vendor.unref(utils_utils.handleRole)(item.role)),
            e: common_vendor.o((index2) => onRoleChange(index2, item))
          };
        }),
        b: common_vendor.unref(utils_utils.roleMap)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93b1025f"], ["__file", "/Users/jianfeiliu/Documents/code/zyxmxcx/pages/userList/index.vue"]]);
wx.createPage(MiniProgramPage);
