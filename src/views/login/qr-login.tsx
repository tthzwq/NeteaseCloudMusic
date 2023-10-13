import React, { memo, useEffect, useRef, useState } from "react";
import Api from "@/api/login";
import { setCookie, openUrl } from "@/utils";

const QRLogin = memo(() => {
  const [qrimg, setQrimg] = useState<string>("");
  const [status, setStatus] = useState(0);
  const timer = useRef<NodeJS.Timeout | undefined>();
  const key = useRef<string>("");

  useEffect(() => {
    login();
    return reset;
  }, []);

  function reset() {
    clearInterval(timer.current);
    setStatus(0);
    setQrimg("");
  }

  async function login() {
    reset()
    const res = await Api.getLoginQrKey();
    key.current = res.data.unikey;
    const res2 = await Api.loginQrCreate({ key: key.current, qrimg: true });
    setQrimg(res2.data.qrimg);

    timer.current = setInterval(async () => {
      const statusRes = await Api.loginQrCheck({ key: key.current });
      setStatus(statusRes.data.code);
      console.log(statusRes.data);

      if (statusRes.data.code === 800) {
        // 二维码已过期,请重新获取
        clearInterval(timer.current);
      }
      if (statusRes.data.code === 803) {
        await Api.getLoginStatus();
        // 授权登录成功
        const cookie = (statusRes.rawHeaders["set-cookie"] || [])
          .map((x: string) => x.replace(/\s*Domain=[^(;|$)]+;*/, ""))
          .join("; ");
        setCookie(cookie);
        console.log(statusRes.rawHeaders["set-cookie"], cookie);
        clearInterval(timer.current);
      }
    }, 1000);
  }

  function handleOpen() {
    openUrl("https://music.163.com/#/download");
  }
  return (
    <div
      data-tauri-drag-region
      className="w-full h-full pt-28 flex flex-col items-center"
    >
      <h1 className="text-3xl pb-4 font-bold">扫码登录</h1>
      <div
        className="relative w-60 h-60 bg-[length:100%_100%]"
        style={{ backgroundImage: `url("${qrimg}")` }}
      >
        {/* {nickname: "無肉不歡_hz", avatarUrl: "https://p2.music.126.net/My4NEKoJs4V3y1awNdIm2g==/109951163984264723.jpg", code: 802, message: "授权中"} */}
        {status === 800 && (
          <div className="flex flex-col items-center justify-center absolute w-full h-full bg-black/80 text-while">
            <div>二维码已失效</div>
            <button
              className="mt-4 px-4 py-1.5 bg-primary rounded-full"
              onClick={login}
            >
              点击刷新
            </button>
          </div>
        )}
      </div>
      <div className="mt-2">
        使用
        <button className="text-[#3371bc]  font-[500]" onClick={handleOpen}>
          网易云音乐APP
        </button>
        扫码登录
      </div>
      <div className="mt-20 text-sm">
        <button>
          选择其他登录模式
          <i className="iconfont icon-ar text-xs"></i>
        </button>
      </div>
    </div>
  );
});

export default QRLogin;
