import type { Produto } from "../data/produtos"

export interface ItemCarrinho extends Produto {
  quantidade: number
  tamanho?: string
}

export function adicionarItemCarrinho(
  itens: ItemCarrinho[],
  produto: Produto,
  tamanho?: string,
): ItemCarrinho[] {
  const existente = itens.find(item => item.id === produto.id && item.tamanho === tamanho)

  if (existente) {
    return itens.map(item =>
      item.id === produto.id && item.tamanho === tamanho
        ? { ...item, quantidade: item.quantidade + 1 }
        : item,
    )
  }

  return [...itens, { ...produto, quantidade: 1, tamanho }]
}

export function removerItemCarrinho(itens: ItemCarrinho[], id: number, tamanho?: string) {
  return itens.filter(item => !(item.id === id && item.tamanho === tamanho))
}

export function atualizarQuantidadeCarrinho(
  itens: ItemCarrinho[],
  id: number,
  quantidade: number,
  tamanho?: string,
) {
  if (!Number.isInteger(quantidade) || quantidade < 1) return itens

  return itens.map(item =>
    item.id === id && item.tamanho === tamanho ? { ...item, quantidade } : item,
  )
}

export function contarItensCarrinho(itens: ItemCarrinho[]) {
  return itens.reduce((total, item) => total + item.quantidade, 0)
}

export function validarCarrinhoGuardado(value: unknown): ItemCarrinho[] {
  if (!Array.isArray(value)) return []

  return value.filter((item): item is ItemCarrinho =>
    item !== null
    && typeof item === "object"
    && Number.isInteger(item.id)
    && Number.isInteger(item.quantidade)
    && item.quantidade > 0
    && typeof item.preco === "number"
    && typeof item.nome === "string"
    && (item.tamanho === undefined || typeof item.tamanho === "string"),
  )
}
