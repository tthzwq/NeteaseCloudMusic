import request from "@/request";

// get /banner
export const getBanner = (params) => request({ url: "/banner", params });
