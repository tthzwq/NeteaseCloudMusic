export function getCookie(): string {
  return localStorage.getItem("cookie") || "";
}

export function setCookie(cookie: string) {
  localStorage.setItem("cookie", cookie);
}