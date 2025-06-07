// utils/cookies.ts

import { timeDuration } from "../time";

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";")

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=")
    if (cookieName.trim() === name) {
      return cookieValue
    }
  }

  return null
}

//setCookie("theme", "dark", 2m); -> 2 minutos
export function setCookie(name: string, value: string, durationStr: string): void {
  const minutes = timeDuration(durationStr);
  const maxAgeSeconds = Math.floor(minutes * 60);
  const isSecure = location.protocol === "https:";

  let cookie = `${name}=${value}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;

  if (isSecure) {
    cookie += "; Secure";
  }

  document.cookie = cookie;
}


export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  console.log("Cookie deleted")
}

export function deleteAllCookies(): void {
  const cookies = document.cookie.split(";")

  for (const cookie of cookies) {
    const [cookieName] = cookie.split("=")
    deleteCookie(cookieName.trim())
  }
  console.log("Cookies deleted")
}