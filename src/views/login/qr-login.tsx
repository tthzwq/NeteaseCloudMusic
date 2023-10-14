import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Api from "@/api/login";
import { setCookie, openUrl, closeCurrentWindow } from "@/utils";
import { emit } from '@tauri-apps/api/event'
import { LOGIN_SUCCESS } from "@/common/constants";

type QRStatusInfo = {
  code?: number;
  message?: string;
  nickname?: string;
  avatarUrl?: string;
};

type QRContentProps = {
  qrimg: string;
  status: number;
  onRefresh: () => void;
};

const QRContent = memo(({ qrimg, status, onRefresh }: QRContentProps) => {
  function handleOpen() {
    openUrl("https://music.163.com/#/download");
  }
  return (
    <>
      <div
        className="relative w-60 h-60 bg-[length:100%_100%]"
        style={{ backgroundImage: `url("${qrimg}")` }}
      >
        {status === 800 && (
          <div className="flex flex-col items-center justify-center absolute w-full h-full bg-black/80 text-while">
            <div>二维码已失效</div>
            <button
              className="mt-4 px-4 py-1.5 bg-primary rounded-full"
              onClick={onRefresh}
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
    </>
  );
});

const QRLogin = memo(() => {
  const [qrimg, setQrimg] = useState<string>("");
  const [status, setStatus] = useState(0);
  const qrUserInfo = useRef<QRStatusInfo>({});
  const timer = useRef<NodeJS.Timeout | undefined>();
  const key = useRef<string>("");

  const UserContent = useMemo(() => {
    return [802, 803].includes(status) ? (
      <>
        <img
          className="mt-4 w-40 h-40 rounded-full"
          src={qrUserInfo.current.avatarUrl}
        />
        <div className="mt-2 w-2/4 text-base text-center font-bol font-[500] truncate">
          {qrUserInfo.current.nickname}
        </div>
        <div className="mt-8 text-sm text-[#888888] font-[500]">扫描成功</div>
        <div className="mt-2 text-lg font-[500]">请在手机上确认登录</div>
      </>
    ) : null;
  }, [status]);

  useEffect(() => {
    login();
    return reset;
  }, []);

  function reset() {
    key.current = "";
    qrUserInfo.current = {};
    clearInterval(timer.current);
    setStatus(0);
    setQrimg("");
  }

  async function login() {
    reset();
    const res = await Api.getLoginQrKey();
    key.current = res.data.unikey;
    const res2 = await Api.loginQrCreate({ key: key.current, qrimg: true });
    setQrimg(res2.data.qrimg);

    timer.current = setInterval(async () => {
      const statusRes = await Api.loginQrCheck({ key: key.current });
      setStatus(statusRes.data.code);
      switch (statusRes.data.code) {
        case 800: // 二维码已过期,请重新获取
          clearInterval(timer.current);
          break;
        case 801: // 等待扫码
          break;
        case 802: // 扫描成功, 待授权
          qrUserInfo.current = statusRes.data as QRStatusInfo;
          break;
        case 803: // 授权登录成功
          // await Api.getLoginStatus();
          const cookie = (statusRes.rawHeaders["set-cookie"] || [])
            .map((x: string) => x.replace(/\s*Domain=[^(;|$)]+;*/, ""))
            .join("; ");
          setCookie(cookie);
          clearInterval(timer.current);
          emit(LOGIN_SUCCESS, { cookie })
          closeCurrentWindow();
          break;

        default:
          break;
      }
    }, 1000);
  }

  return (
    <div
      data-tauri-drag-region
      className="w-full h-full pt-28 flex flex-col items-center"
    >
      <h1 className="text-3xl pb-4 font-bold">扫码登录</h1>
      {[802, 803].includes(status) ? (
        UserContent
      ) : (
        <QRContent qrimg={qrimg} status={status} onRefresh={login} />
      )}
    </div>
  );
});

export default QRLogin;
