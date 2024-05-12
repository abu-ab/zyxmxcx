"use strict";
require("../common/vendor.js");
const utils_http = require("../utils/http.js");
const getRegionList = () => {
  return utils_http.http.get("/region.JSON");
};
exports.getRegionList = getRegionList;
