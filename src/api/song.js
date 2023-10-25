import request from "@/request";

/**
 * 获取音乐 url - 新版
 * @param {Object} params {id: "405998841,33894312", level: "standard"}
 * @param {String} level 音质等级 standard => 标准,higher => 较高, exhigh=>极高,  lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
 */
export const getSongUrlV1 = (params) => request({ url: "/song/url/v1", params });

/**
 * 获取音乐 url
 * @param {Object} params {id: "405998841,33894312", br: 320000} id: 音乐id, br: 码率,默认999000即最大
 */
export const getSongUrl = (params) => request({ url: "/song/url", params });

export default {
  getSongUrlV1,
  getSongUrl
};
