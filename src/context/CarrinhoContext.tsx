import { useState, useEffect, createContext, type ReactNode } from "react"
import type { Produto } from "../data/produtos"

// Tipo interno para cada item do carrinho
// Basicamente é um Produto mas com quantidade e opcionalmente tamanho
interface ItemCarrinho extends Produto {
  quantidade: number
  tamanho?: string
}

// Interface do contexto do carrinho com tudo o que exponho para o resto da app
interface CarrinhoContextType {
  itens: ItemCarrinho[]
  carrinhoQtd: number
  adicionarProduto: (produto: Produto, tamanho?: string) => void
  removerProduto: (id: number) => void
  alterarQuantidade: (id: number, quantidade: number) => void
  limparCarrinho: () => void
}

// Crio o contexto com funções vazias só para garantir tipagem
// Isto evita erros quando algum componente tenta usar o contexto fora do provider
export const CarrinhoContext = createContext<CarrinhoContextType>({
  itens: [],
  carrinhoQtd: 0,
  adicionarProduto: () => {},
  removerProduto: () => {},
  alterarQuantidade: () => {},
  limparCarrinho: () => {},
})

// Provider que controla todo o estado do carrinho e ainda o guarda no localStorage
export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {

  // Estado inicial do carrinho, tento puxar do localStorage
  // Se der erro ou estiver vazio, começo com array vazio
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    try {
      const carrinhoStorage = localStorage.getItem("carrinho")
      return carrinhoStorage ? JSON.parse(carrinhoStorage) : []
    } catch {
      // Se o JSON estiver marado, limpo e sigo em frente
      localStorage.removeItem("carrinho")
      return []
    }
  })

  // Sempre que o carrinho muda, guardo no localStorage
  // Assim o utilizador não perde o carrinho quando fecha o site
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens))
  }, [itens])

  // Quantidade total de itens no carrinho
  const carrinhoQtd = itens.reduce((acc, item) => acc + item.quantidade, 0)

  // Função para adicionar um produto ao carrinho
  // Se já existir o mesmo produto com o mesmo tamanho, só aumento a quantidade
  const adicionarProduto = (produto: Produto, tamanho?: string) => {
    setItens(prev => {
      const existe = prev.find(p => p.id === produto.id && p.tamanho === tamanho)

      if (existe) {
        return prev.map(p =>
          p.id === produto.id && p.tamanho === tamanho
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        )
      }

      // Se não existir, adiciono como novo item com quantidade 1
      return [...prev, { ...produto, quantidade: 1, tamanho }]
    })
  }

  // Remove um produto do carrinho pelo id
  const removerProduto = (id: number) => {
    setItens(prev => prev.filter(p => p.id !== id))
  }

  // Altera a quantidade de um item, mas nunca deixo ir abaixo de 1
  const alterarQuantidade = (id: number, quantidade: number) => {
    if (quantidade < 1) return
    setItens(prev => prev.map(p => (p.id === id ? { ...p, quantidade } : p)))
  }

  // Limpa o carrinho todo
  const limparCarrinho = () => {
    setItens([])
  }

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        carrinhoQtd,
        adicionarProduto,
        removerProduto,
        alterarQuantidade,
        limparCarrinho
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}