import { open } from '@tauri-apps/api/shell';

export function openUrl(url: string) {
  if (window.__TAURI__) {
    // 默认浏览器打开
    open(url);
  } else {
    // 新窗口打开
    window.open(url, '_blank');
  }
}