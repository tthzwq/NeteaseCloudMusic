import request, { tauriGetRequestOptions, tauriFormatParams } from "@/request";
import QRCode from "qrcode"

export const getLoginQrKey = (params) =>
  request({ url: "/login/qr/key", params });

export const loginQrCreate = async (params) => {
  const url = "/login/qr/create";
  // TAURI
  if (window.__TAURI__) {
    const result = await tauriGetRequestOptions({
      method: "GET",
      url,
      params: tauriFormatParams(params),
      cookie: "",
    });
    const qrurl = result.url;
    const qrimg = await QRCode.toDataURL(qrurl);
    return {
      ...result,
      code: 200,
      data: { qrimg, qrurl },
    };
  }

  return request({ url, params });
};

export const loginQrCheck = (params) =>
  request({ url: "/login/qr/check", params });

export const getLoginStatus = (params) =>
  request({ url: "/login/status", params });

export default {
  getLoginQrKey,
  loginQrCreate,
  loginQrCheck,
  getLoginStatus,
};