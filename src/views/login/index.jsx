import React, { memo, useRef, useState } from "react";
import Api from "@/api/login";
import { setCookie } from "@/utils/cookie";
import { getAccountInfo } from "@/api/user";

const Login = memo(() => {
  const [qrimg, setQrimg] = useState("");
  const [url, setUrl] = useState("");
  const timer = useRef(null);
  const key = useRef(null);

  async function checkStatus(key) {
    const res = await Api.loginQrCheck({ key });
    return res.data;
  }
  async function login() {
    clearInterval(timer.current);
    const res = await Api.getLoginQrKey();
    key.current = res.data.unikey;
    const res2 = await Api.loginQrCreate({ key: key.current, qrimg: true });
    setQrimg(res2.data.qrimg);
    setUrl(res2.data.qrurl);

    timer.current = setInterval(async () => {
      const statusRes = await Api.loginQrCheck({ key: key.current });
      console.log(statusRes);
      if (statusRes.data.code === 800) {
        // alert('二维码已过期,请重新获取')
        clearInterval(timer.current);
      }
      if (statusRes.data.code === 803) {
        const cookie = (statusRes.rawHeaders['set-cookie'] || []).map((x) =>
        x.replace(/\s*Domain=[^(;|$)]+;*/, ''),
      ).join('; ');
        //     alert('授权登录成功')
        setCookie(cookie);
        console.log(statusRes.rawHeaders['set-cookie'], cookie);
        clearInterval(timer.current);
      }
    }, 3000);
  }

  function getLoginStatus() {
    Api.getLoginStatus()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUserInfo() {
    getAccountInfo()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <div
      data-tauri-drag-region
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <h1>扫码登录</h1>
      <h2>url: {url}</h2>
      <img className="w-40 h-40" src={qrimg} />
      <button onClick={login}> login </button>
      <div>
        <button onClick={getLoginStatus}>getLoginStatus</button>
      </div>
      <div>
        <button onClick={getUserInfo}>getUserInfo</button>
      </div>
    </div>
  );
});

Login.displayName = "Login";

export const Component = Login;

export default Login;
