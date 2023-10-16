import { LOGIN_SUCCESS, LOGIN_WINDOW_NAME } from "@/common/constants";
import { UnlistenFn, listen } from "@tauri-apps/api/event";
import { createWebviewWindow, getWindowByLabel } from "./window";

export function initLogin() {
  let unlistenLoginSuccess: UnlistenFn | undefined;
  let unlistenWindowClose: UnlistenFn | undefined;

  function unlisten() {
    unlistenWindowClose && unlistenWindowClose();
    unlistenLoginSuccess && unlistenLoginSuccess();
  }

  return new Promise(async (resolve, reject) => {
    const loginWin = await createWebviewWindow({
      label: LOGIN_WINDOW_NAME,
      url: "/login",
      acceptFirstMouse: true,
      alwaysOnTop: true,
      center: true,
      width: 350,
      height: 530,
      hiddenTitle: true,
      resizable: false,
      skipTaskbar: true,
      titleBarStyle: "overlay",
    });
    // 窗口被关闭
    unlistenWindowClose = await loginWin.onCloseRequested(() => {
      unlisten();
      reject({ message: "登录窗口被关闭" })
    });
    // 登录成功
    unlistenLoginSuccess = await listen(LOGIN_SUCCESS, ({ payload }) => {
      unlisten();
      resolve(payload);
    })
  });
}

export function getLoginWindow() {
  return getWindowByLabel(LOGIN_WINDOW_NAME);
}
