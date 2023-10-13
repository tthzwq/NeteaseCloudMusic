import { createWebviewWindow } from "@/utils/window.ts";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const Sider = memo(() => {
  async function handleLogin() {
    const loginWin = await createWebviewWindow({
      label: "login",
      url: "/login",
      acceptFirstMouse: true,
      alwaysOnTop: false,
      center: true,
      width: 350,
      height: 530,
      hiddenTitle: true,
      resizable: false,
      skipTaskbar: true,
      titleBarStyle: "overlay",
    });
  }
  return (
    <div className="pt-[50px] bg-[#ededed]">
      <button onClick={handleLogin}>login</button>
      <ul>
        <li>
          <NavLink to="/discovery">发现音乐</NavLink>
        </li>
        <li>
          <NavLink to="/my">我喜欢的音乐</NavLink>
        </li>
      </ul>
    </div>
  );
});

export default Sider;
