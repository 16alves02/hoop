import { useState, useEffect, createContext, type ReactNode } from "react"
import type { Produto } from "../data/produtos"

// Tipos internos: um item de carrinho estende `Produto` com quantidade e tamanho
interface ItemCarrinho extends Produto {
  quantidade: number
  tamanho?: string
}

// Interface do contexto do carrinho: funções utilitárias e estado
interface CarrinhoContextType {
  itens: ItemCarrinho[]
  carrinhoQtd: number
  adicionarProduto: (produto: Produto, tamanho?: string) => void
  removerProduto: (id: number) => void
  alterarQuantidade: (id: number, quantidade: number) => void
  limparCarrinho: () => void
}

// Criamos um contexto com implementações vazias por defeito (só para tipagem)
export const CarrinhoContext = createContext<CarrinhoContextType>({
  itens: [],
  carrinhoQtd: 0,
  adicionarProduto: () => {},
  removerProduto: () => {},
  alterarQuantidade: () => {},
  limparCarrinho: () => {},
})

// Provider que mantém o estado do carrinho e persiste em localStorage
export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    try {
      // Tenta restaurar o carrinho do localStorage
      const carrinhoStorage = localStorage.getItem("carrinho")
      return carrinhoStorage ? JSON.parse(carrinhoStorage) : []
    } catch {
      // Se houver erro de parsing, limpa o item e começa com vazio
      localStorage.removeItem("carrinho")
      return []
    }
  })

  // Sempre que `itens` muda, persistimos no localStorage
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens))
  }, [itens])

  // Soma total de quantidades no carrinho
  const carrinhoQtd = itens.reduce((acc, item) => acc + item.quantidade, 0)

  // Adiciona produto: se já existir (mesmo id e tamanho) incrementa quantidade
  const adicionarProduto = (produto: Produto, tamanho?: string) => {
    setItens(prev => {
      const existe = prev.find(p => p.id === produto.id && p.tamanho === tamanho)
      if (existe) {
        return prev.map(p =>
          p.id === produto.id && p.tamanho === tamanho ? { ...p, quantidade: p.quantidade + 1 } : p
        )
      }
      // Caso não exista, adiciona com quantidade 1
      return [...prev, { ...produto, quantidade: 1, tamanho }]
    })
  }

  // Remove um produto do carrinho pelo id
  const removerProduto = (id: number) => {
    setItens(prev => prev.filter(p => p.id !== id))
  }

  // Altera a quantidade de um item (não permite < 1)
  const alterarQuantidade = (id: number, quantidade: number) => {
    if (quantidade < 1) return
    setItens(prev => prev.map(p => (p.id === id ? { ...p, quantidade } : p)))
  }

  // Limpa todo o carrinho
  const limparCarrinho = () => {
    setItens([])
  }

  return (
    <CarrinhoContext.Provider
      value={{ itens, carrinhoQtd, adicionarProduto, removerProduto, alterarQuantidade, limparCarrinho }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}