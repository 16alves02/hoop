import type { Produto } from "../data/produtos"

export function adicionarAosFavoritos(favoritos: Produto[], produto: Produto) {
  return favoritos.some(item => item.id === produto.id)
    ? favoritos
    : [...favoritos, produto]
}

export function removerDosFavoritos(favoritos: Produto[], id: number) {
  return favoritos.filter(item => item.id !== id)
}

export function validarFavoritosGuardados(value: unknown): Produto[] {
  if (!Array.isArray(value)) return []

  return value.filter((item): item is Produto =>
    item !== null
    && typeof item === "object"
    && Number.isInteger(item.id)
    && typeof item.nome === "string"
    && typeof item.preco === "number",
  )
}
