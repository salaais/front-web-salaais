// utils/cookies.ts

import { makeEnum } from "../enum";
import { timeDuration } from "../time";

export const Cookie = makeEnum({
  access_token: "access_token", // string
  login_state_apple: "login_state_apple" // string
})

// setCookie("permissoes_ativas", ["COMUM", "ADMIN"], "10m");
export function getCookie<T = unknown>(name: string): T | null {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieName, cookieValueRaw] = cookie.split("=");

    if (cookieName.trim() === name) {
      const value = decodeURIComponent(cookieValueRaw);

      try {
        return JSON.parse(value) as T;
      } catch {
        // fallback para tipos simples
        if (value === "true") return true as T;
        if (value === "false") return false as T;

        const numberValue = Number(value);
        if (!isNaN(numberValue) && value.trim() !== "") return numberValue as T;

        return value as T;
      }
    }
  }

  return null;
}

//setCookie("theme", "dark", 2m); -> 2 minutos
export function setCookie(name: string, value: unknown, durationStr: string): void {
  const minutes = timeDuration(durationStr);
  const maxAgeSeconds = Math.floor(minutes * 60);
  const isSecure = location.protocol === "https:";

  // Se for objeto ou array, serializa com JSON
  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  let cookie = `${name}=${encodeURIComponent(stringValue)}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;

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