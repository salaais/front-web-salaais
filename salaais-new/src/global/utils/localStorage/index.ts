import { makeEnum } from "../enum"

export const LocalStorage = makeEnum({
  isMenuOpen: "isMenuOpen", //bool
  permissions: "permissions"// striing[]
})

// Armazena qualquer tipo de valor (T) no localStorage
// setLocalStorage<boolean>(LocaStorage.isMenuOpen, true)
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Erro ao definir item no localStorage:", error)
  }
}

// Recupera e infere o tipo correto do valor salvo
//getLocalStorage<boolean>(LocaStorage.isMenuOpen)
export function getLocalStorage<T>(key: string): T | null {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) as T : null
  } catch (error) {
    console.error("Erro ao obter item do localStorage:", error)
    return null
  }
}
