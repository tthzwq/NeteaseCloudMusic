export function getCookie() {
  return localStorage.getItem("cookie") || "";
}

export function setCookie(cookie) {
  localStorage.setItem("cookie", cookie);
}