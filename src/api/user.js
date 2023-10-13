import request from "@/request";

export const getAccountInfo = (params) =>
  request({ url: "/user/account", params });

export default {
  getAccountInfo,
};
