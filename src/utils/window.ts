import { WebviewWindow, WindowOptions } from "@tauri-apps/api/window";

interface CreateWindowOptions extends WindowOptions {
  label: string;
}

export function createWebviewWindow(options: CreateWindowOptions): Promise<WebviewWindow> {
  const { label, ...rest } = options;

  return new Promise((resolve, reject) => {
    let createdWindow: WebviewWindow | null = WebviewWindow.getByLabel(label);
    if (createdWindow) {
      createdWindow.unminimize()
      createdWindow.setFocus()
      resolve(createdWindow)
      return
    }

    const webview: WebviewWindow = new WebviewWindow(label, rest);
    webview.once("tauri://created", function () {
      resolve(webview);
    });
    webview.once("tauri://error", reject);
  });
}
