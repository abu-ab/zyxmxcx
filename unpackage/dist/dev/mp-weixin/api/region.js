"use strict";
const utils_http = require("../utils/http.js");
const getRegionList = () => {
  return utils_http.http.get("/region/list");
};
exports.getRegionList = getRegionList;
