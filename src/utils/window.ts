import { WebviewWindow, getCurrent, WindowOptions } from "@tauri-apps/api/window";

interface CreateWindowOptions extends WindowOptions {
  label: string;
}

export function createWebviewWindow(options: CreateWindowOptions): Promise<WebviewWindow> {
  const { label, ...rest } = options;

  return new Promise((resolve, reject) => {
    const webview: WebviewWindow = new WebviewWindow(label, rest);
    webview.once("tauri://created", function () {
      resolve(webview);
    });
    webview.once("tauri://error", reject);
  });
}

export function closeWindow(win: WebviewWindow): void {
  win.close();
}

export function focusWindow(win: WebviewWindow): void {
  win.unminimize();
  win.setFocus();
}

export function getWindowByLabel(label: string): WebviewWindow | null {
  return WebviewWindow.getByLabel(label);
}

export function closeCurrentWindow(): void {
  const currentWindow = getCurrent();
  if (currentWindow) {
    closeWindow(currentWindow);
  }
}