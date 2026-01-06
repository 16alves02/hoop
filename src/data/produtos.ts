import produtosData from "./produtos.json"

// Interface principal dos produtos da loja
// Aqui defino tudo o que um produto pode ter, mas deixo várias props opcionais
// porque nem todos os produtos têm jogador, equipa, tamanhos, etc
// Isto dá flexibilidade e evita erros quando estou a mapear produtos diferentes
export interface Produto {
  id: number
  tipo: string
  nome: string
  jogador?: string
  equipa?: string
  marca?: string
  preco: number
  categoria: string
  imagens: string[] // cada produto tem sempre pelo menos uma imagem
  descricao: string
  genero?: "homem" | "mulher" | "criança" | "unisex" | null // nem todos têm género definido
  tamanhos?: string[] // só faz sentido para roupa e sapatilhas
  cores?: string[] // alguns produtos têm variações de cor
  novidade?: boolean // flag simples para destacar produtos novos
  promocao?: boolean // flag para mostrar badge de promoção
  reviews?: {
    nome: string
    data: string
    estrelas: number
    comentario: string
  }[] // reviews opcionais, nem todos os produtos têm
}

// Exporto os produtos já tipados para garantir segurança no resto da app
// O cast é só para garantir ao TS que o JSON segue a interface Produto
export const produtos: Produto[] = produtosData as Produto[]