import request from "@/request";

/** 获取每日推荐歌单(需要登录) */
export const getRecommendResource = (params) => request({ url: "/recommend/resource", params });


/**
 * 推荐歌单
 * @param {Object} params { limit: 1 }
 */
export const getPersonalized = (params) => request({ url: "/personalized", params });

export default {
  getRecommendResource,
};
