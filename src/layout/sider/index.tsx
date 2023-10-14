import React, { memo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { focusWindow, getLoginWindow, initLogin } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccountInfo } from "@/store/user";

const Sider = memo(() => {
  useEffect(() => {
    dispatch(fetchAccountInfo() as any);
  }, [])

  const { accountInfo } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  async function handleLogin() {
    const loginWindow = getLoginWindow();
    if (loginWindow) {
      focusWindow(loginWindow);
      return;
    }
    initLogin().then(() => {
      dispatch(fetchAccountInfo() as any);
    });
  }

  return (
    <div className="pt-[50px] bg-[#ededed]">
      {accountInfo ? (
        <>
          <div className="flex items-center">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={accountInfo.profile.avatarUrl}
              alt=""
            />
            <span className="ml-[10px]">{accountInfo.profile.nickname}</span>
          </div>
        </>
      ) : (
        <button onClick={handleLogin}>login</button>
      )}
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
