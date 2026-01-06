import { createContext } from "react"

// Aqui defino os tipos base do sistema de autenticação
// Separei isto do AuthProvider porque assim mantenho o código mais limpo
// e evito aquelas regras chatas do ESLint sobre hot-reload e ficheiros misturados

export interface User {
  nome: string
  email: string
  provider: "google" | "apple" | "email" | "outlook" // só permito estes providers para manter tudo controlado
}

interface AuthContextType {
  // Estado atual do utilizador, se for null significa que não está autenticado
  user: User | null

  // Função para fazer login, recebe um user e guarda-o no contexto
  login: (user: User) => void

  // Função para fazer logout, limpa o estado e o localStorage
  logout: () => void

  // Booleano simples para saber rapidamente se há alguém autenticado
  isAuthenticated: boolean
}

// Crio o contexto aqui para ser usado em qualquer parte da app
// Começa como undefined porque só fica válido dentro do AuthProvider
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export type { AuthContextType }