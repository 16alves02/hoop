/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, type ReactNode } from "react"
import type { Produto } from "../data/produtos"
import {
  adicionarAosFavoritos,
  removerDosFavoritos,
  validarFavoritosGuardados,
} from "./favoritosLogic"

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
      const guardado = localStorage.getItem("hoop_favoritos")
      return guardado ? validarFavoritosGuardados(JSON.parse(guardado)) : []
    } catch {
      localStorage.removeItem("hoop_favoritos")
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("hoop_favoritos", JSON.stringify(favoritos))
  }, [favoritos])

  const adicionarFavorito = (produto: Produto) => {
    setFavoritos(prev => adicionarAosFavoritos(prev, produto))
  }

  const removerFavorito = (id: number) => {
    setFavoritos(prev => removerDosFavoritos(prev, id))
  }

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        adicionarFavorito,
        removerFavorito,
        estaNosFavoritos: id => favoritos.some(item => item.id === id),
        quantidadeFavoritos: favoritos.length,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  )
}
