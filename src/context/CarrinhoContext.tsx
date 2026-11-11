/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, type ReactNode } from "react"
import type { Produto } from "../data/produtos"
import {
  adicionarItemCarrinho,
  atualizarQuantidadeCarrinho,
  contarItensCarrinho,
  removerItemCarrinho,
  validarCarrinhoGuardado,
  type ItemCarrinho,
} from "./carrinhoLogic"

interface CarrinhoContextType {
  itens: ItemCarrinho[]
  carrinhoQtd: number
  adicionarProduto: (produto: Produto, tamanho?: string) => void
  removerProduto: (id: number, tamanho?: string) => void
  alterarQuantidade: (id: number, quantidade: number, tamanho?: string) => void
  limparCarrinho: () => void
}

export const CarrinhoContext = createContext<CarrinhoContextType>({
  itens: [],
  carrinhoQtd: 0,
  adicionarProduto: () => {},
  removerProduto: () => {},
  alterarQuantidade: () => {},
  limparCarrinho: () => {},
})

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    try {
      const guardado = localStorage.getItem("carrinho")
      return guardado ? validarCarrinhoGuardado(JSON.parse(guardado)) : []
    } catch {
      localStorage.removeItem("carrinho")
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens))
  }, [itens])

  const adicionarProduto = (produto: Produto, tamanho?: string) => {
    setItens(prev => adicionarItemCarrinho(prev, produto, tamanho))
  }

  const removerProduto = (id: number, tamanho?: string) => {
    setItens(prev => removerItemCarrinho(prev, id, tamanho))
  }

  const alterarQuantidade = (id: number, quantidade: number, tamanho?: string) => {
    setItens(prev => atualizarQuantidadeCarrinho(prev, id, quantidade, tamanho))
  }

  const limparCarrinho = () => setItens([])

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        carrinhoQtd: contarItensCarrinho(itens),
        adicionarProduto,
        removerProduto,
        alterarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}
