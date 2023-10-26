import request from "@/request";

/**
 * 获取歌手详情
 * @param {Object} params {id: "405998841"}
 */
export const getArtistInfo = (params) => request({ url: "/artist/detail", params });

export default {
  getArtistInfo,
};
