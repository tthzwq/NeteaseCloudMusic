import React, { memo, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { focusWindow, getLoginWindow, initLogin } from "@/utils";
import { fetchAccountInfo, loginOut, setCookie } from "@/store/user";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { fetchRecommendData } from "@/store/cache";

const links = [
  { to: "/discovery", title: "发现音乐", icon: "music" },
  { to: "/my", title: "我喜欢的音乐", icon: "like" },
];

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
      dispatch(fetchRecommendData());
    });
  }

  function exit() {
    dispatch(loginOut());
  }

  return (
    <div className="pt-[50px] bg-[#ededed]">
      <div
        className="group relative h-14 my-2 py-1 px-3 cursor-pointer"
        onClick={handleLogin}
      >
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
        {cookie && (
          <button
            className="hidden group-hover:flex absolute top-1/2 right-2 rounded-full hover:bg-ctd/40 w-6 h-6 justify-center items-center -translate-y-1/2"
            onClick={exit}
          >
            <i className="iconfont icon-quit"></i>
          </button>
        )}
      </div>
      <ul>
        {links.map((item) => {
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => {
                  return (
                    (isActive ? "text-primary active" : "text-ct") +
                    " group/navlink"
                  );
                }}
              >
                <div className="flex items-center px-6 py-2 group-hover/navlink:bg-ctd/10 group-[.active]/navlink:bg-ctd/10">
                  <i className={`iconfont icon-${item.icon} text-xl`}></i>
                  <span className="ml-1">{item.title}</span>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Sider;
