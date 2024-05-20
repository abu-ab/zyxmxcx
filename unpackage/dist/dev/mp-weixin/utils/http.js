"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://139.9.198.139:8081";
const http = {
  async get(url, params) {
    return await request(getFullUrl(url), "GET", params);
  },
  async post(url, data) {
    return await request(getFullUrl(url), "POST", data);
  },
  async put(url, data) {
    return await request(getFullUrl(url), "PUT", data);
  },
  async delete(url, params) {
    return await request(getFullUrl(url), "DELETE", params);
  }
};
function getFullUrl(url) {
  return `${BASE_URL}${url}`;
}
async function request(url, method, data) {
  const response = await common_vendor.index.request({
    url,
    method,
    data
  });
  console.log(response);
  return response.data;
}
exports.http = http;
