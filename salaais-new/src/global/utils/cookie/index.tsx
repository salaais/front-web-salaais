// utils/cookies.ts

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

//setCookie("login_state_apple", state, 5); -> expira em 5 minutos
//setCookie("theme", "dark", 60 * 24 * 7); -> expira em 7 dias
export function setCookie(name: string, value: string, minutes: number): void {
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
