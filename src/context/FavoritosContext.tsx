import { createContext, useState, useEffect, type ReactNode } from "react"
import type { Produto } from "../data/produtos"

// Interface com tudo o que o contexto dos favoritos expõe
// Basicamente a lista, funções para mexer nela e um contador rápido
interface FavoritosContextType {
  favoritos: Produto[]
  adicionarFavorito: (produto: Produto) => void
  removerFavorito: (id: number) => void
  estaNosFavoritos: (id: number) => boolean
  quantidadeFavoritos: number
}

// Crio o contexto com valores default só para garantir tipagem
// Estes valores só servem para evitar erros quando alguém usa o contexto fora do provider
export const FavoritosContext = createContext<FavoritosContextType>({
  favoritos: [],
  adicionarFavorito: () => {},
  removerFavorito: () => {},
  estaNosFavoritos: () => false,
  quantidadeFavoritos: 0,
})

// Provider responsável por gerir os favoritos e guardá-los no localStorage
export const FavoritosProvider = ({ children }: { children: ReactNode }) => {

  // Estado inicial dos favoritos, puxado do localStorage
  // Se o JSON estiver marado ou não existir, começo com array vazio
  const [favoritos, setFavoritos] = useState<Produto[]>(() => {
    try {
      const stored = localStorage.getItem("hoop_favoritos")
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Sempre que a lista de favoritos muda, guardo no localStorage
  useEffect(() => {
    localStorage.setItem("hoop_favoritos", JSON.stringify(favoritos))
  }, [favoritos])

  // Adiciona um produto aos favoritos, mas só se ainda não estiver lá
  const adicionarFavorito = (produto: Produto) => {
    setFavoritos(prev => {
      if (prev.some(p => p.id === produto.id)) return prev
      return [...prev, produto]
    })
  }

  // Remove um favorito pelo id
  const removerFavorito = (id: number) => {
    setFavoritos(prev => prev.filter(p => p.id !== id))
  }

  // Verifica se um produto está nos favoritos
  const estaNosFavoritos = (id: number) => favoritos.some(p => p.id === id)

  // Contador rápido para mostrar no header ou onde for preciso
  const quantidadeFavoritos = favoritos.length

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        adicionarFavorito,
        removerFavorito,
        estaNosFavoritos,
        quantidadeFavoritos,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  )
}