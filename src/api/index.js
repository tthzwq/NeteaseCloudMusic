import request from "@/request";
export * from "./recommend";
export * from "./user";
export * from "./login";
export * from "./song";
export * from "./artist";
export * from "./playlist";

export const getBanners = (params) => request({ url: "/banner", params });
