import produtosData from "./produtos.json"

// Exporta os produtos com o tipo completo para o TypeScript
// jogador, equipa, genero, tamanhos, cores, novidade, promocao, são opcionais (?) 
// porque nem todos os produtos (ex: bolas ou acessórios) têm essa informação
export interface Produto {
  id: number
  tipo: string
  nome: string
  jogador?: string
  equipa?: string
  marca?: string
  preco: number
  categoria: string
  imagens: string[]
  descricao: string
  genero?: "homem" | "mulher" | "criança" | "unisex" | null
  tamanhos?: string[]
  cores?: string[]
  novidade?: boolean
  promocao?: boolean
  reviews?: { nome: string; data: string; estrelas: number; comentario: string }[]
}

export const produtos: Produto[] = produtosData as Produto[];