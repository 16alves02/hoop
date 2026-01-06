import { createContext } from "react"

// Tipos e criação do contexto de autenticação
// Este ficheiro contém apenas a definição do contexto e tipos,
// separado do `AuthProvider` para evitar a regra do ESLint
// que exige que um ficheiro exporte apenas componentes para hot-reload
export interface User {
  nome: string
  email: string
  provider: "google" | "apple" | "email" | "outlook"
}

interface AuthContextType {
  // Estado do utilizador (null se não autenticado)
  user: User | null
  // Função para efetuar login
  login: (user: User) => void
  // Função para logout
  logout: () => void
  // Indicador rápido se há um utilizador autenticado
  isAuthenticated: boolean
}

// Criamos o contexto aqui para ser importado por componentes e páginas
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export type { AuthContextType }
