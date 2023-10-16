import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { focusWindow, getLoginWindow, initLogin } from "@/utils";
import { fetchAccountInfo, setCookie } from "@/store/user";
import { useAppSelector, useAppDispatch } from "@/hooks";

const Sider = memo(() => {
  const { accountInfo, cookie } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  async function handleLogin() {
    const loginWindow = getLoginWindow();
    if (loginWindow) {
      focusWindow(loginWindow);
      return;
    }
    initLogin().then((res: any) => {
      dispatch(setCookie(res.cookie));
      dispatch(fetchAccountInfo());
    });
  }

  return (
    <div className="pt-[50px] bg-[#ededed]">
      {cookie ? (
        accountInfo &&
        accountInfo.profile && (
          <>
            <div className="flex items-center">
              <img
                className="w-11 h-11 rounded-full"
                src={accountInfo.profile.avatarUrl}
              />
              <span className="ml-[10px]">{accountInfo.profile.nickname}</span>
            </div>
          </>
        )
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
