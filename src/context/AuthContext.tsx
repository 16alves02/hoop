import { useState, type ReactNode } from "react"
import { AuthContext, type User } from "./AuthContextValue"

// `AuthProvider` fornece o estado de autenticação à árvore de componentes.
// Utiliza `localStorage` para persistir o utilizador entre visitas.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa o user a partir do localStorage (se existir)
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("hoop_user")
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      // Se ocorrer um erro a ler/parsing, limpamos o item para evitar loops
      console.error("Erro ao ler user do localStorage", error)
      localStorage.removeItem("hoop_user")
      return null
    }
  })

  // Simula um login: actualiza estado e grava no localStorage
  const login = (user: User) => {
    setUser(user)
    localStorage.setItem("hoop_user", JSON.stringify(user))
  }

  // Logout: remove o utilizador do estado e do localStorage
  const logout = () => {
    setUser(null)
    localStorage.removeItem("hoop_user")
  }

  // Fornece o contexto com as funções de login/logout e o estado
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}