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

export function setCookie(name: string, value: string, days: number): void {
  const expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${expirationDate.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/`
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
