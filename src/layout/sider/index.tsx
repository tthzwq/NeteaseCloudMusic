import React, { memo, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { focusWindow, getLoginWindow, initLogin } from "@/utils";
import { fetchAccountInfo, setCookie } from "@/store/user";
import { useAppSelector, useAppDispatch } from "@/hooks";

const Sider = memo(() => {
  const { accountInfo, cookie } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const userInfo = useMemo(() => {
    if (cookie) {
      return {
        avatarUrl: accountInfo?.profile?.avatarUrl,
        nickname: accountInfo?.profile?.nickname,
      };
    }
    return { avatarUrl: "/svg/user.svg", nickname: "未登录" };
  }, [accountInfo, cookie]);

  useEffect(() => {
    cookie && dispatch(fetchAccountInfo());
  }, []);


  async function handleLogin() {
    if (cookie) return;
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
      <div className="h-14 my-2 py-1 px-3 cursor-pointer" onClick={handleLogin}>
        <div className="flex items-center">
          <img
            className="w-12 h-12 bg-[#e0e0e0] rounded-full shadow-inner"
            src={userInfo.avatarUrl}
          />
          <div className="max-w-[150px] pl-3 pr-2 leading-4 font-[500] truncate">
            {userInfo.nickname}
          </div>
          <div className="border-l-[6px] border-y-4 divide-solid border-y-[transparent] border-l-[#8e8e8e]"></div>
        </div>
      </div>
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
