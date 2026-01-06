import { createContext, useState, useEffect, type ReactNode } from "react"
import type { Produto } from "../data/produtos"

interface FavoritosContextType {
  favoritos: Produto[]
  adicionarFavorito: (produto: Produto) => void
  removerFavorito: (id: number) => void
  estaNosFavoritos: (id: number) => boolean
  quantidadeFavoritos: number
}

export const FavoritosContext = createContext<FavoritosContextType>({
  favoritos: [],
  adicionarFavorito: () => {},
  removerFavorito: () => {},
  estaNosFavoritos: () => false,
  quantidadeFavoritos: 0,
})

export const FavoritosProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<Produto[]>(() => {
    try {
      const stored = localStorage.getItem("hoop_favoritos")
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("hoop_favoritos", JSON.stringify(favoritos))
  }, [favoritos])

  const adicionarFavorito = (produto: Produto) => {
    setFavoritos((prev) => {
      if (prev.some((p) => p.id === produto.id)) return prev
      return [...prev, produto]
    })
  }

  const removerFavorito = (id: number) => {
    setFavoritos((prev) => prev.filter((p) => p.id !== id))
  }

  const estaNosFavoritos = (id: number) => favoritos.some((p) => p.id === id)

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