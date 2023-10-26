
import request from "@/request";

/**
 * 获取歌单详情
 * @param {Object} params {id: "405998841"}
 */
export const getPlaylistDetail = (params) => request({ url: "/playlist/detail", params });

export default {
  getPlaylistDetail,
};
