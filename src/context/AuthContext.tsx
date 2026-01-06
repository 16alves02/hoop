import { useState, type ReactNode } from "react"
import { AuthContext, type User } from "./AuthContextValue"

// Provider responsável por gerir a autenticação em toda a app
// Basicamente guarda o user no estado e no localStorage para não desaparecer quando o utilizador fecha o site
export const AuthProvider = ({ children }: { children: ReactNode }) => {

  // Estado do user, inicializado logo a partir do localStorage
  // Uso a função dentro do useState para só correr isto uma vez no arranque
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("hoop_user")
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      // Se der erro a ler o JSON, limpo o localStorage para evitar cenas estranhas
      console.error("Erro ao ler user do localStorage", error)
      localStorage.removeItem("hoop_user")
      return null
    }
  })

  // Função de login, guarda o user no estado e no localStorage
  // Aqui não há autenticação real, é só simulação para o projeto
  const login = (user: User) => {
    setUser(user)
    localStorage.setItem("hoop_user", JSON.stringify(user))
  }

  // Função de logout, limpa tudo e volta ao estado inicial
  const logout = () => {
    setUser(null)
    localStorage.removeItem("hoop_user")
  }

  // O provider expõe o user, as funções e um booleano simples para saber se está autenticado
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}