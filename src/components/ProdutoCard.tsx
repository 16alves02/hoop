import { Link } from "react-router-dom"
import type { Produto } from "../data/produtos"
import { useContext } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { FavoritosContext } from "../context/FavoritosContext"
import { ToastContext } from "../context/ToastContext"
import ImageLoader from "./ImageLoader"

type ProdutoCardProps = {
  produto: Produto
}

function ProdutoCard({ produto }: ProdutoCardProps) {
  const { adicionarProduto } = useContext(CarrinhoContext)
  const { adicionarFavorito, removerFavorito, estaNosFavoritos } = useContext(FavoritosContext)
  const { addToast } = useContext(ToastContext)

  const hasTamanhos = produto.tamanhos && produto.tamanhos.length > 0
  const isFavorito = estaNosFavoritos(produto.id)

  const toggleFavorito = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorito) {
      removerFavorito(produto.id)
      addToast("Removido dos favoritos", "info")
    } else {
      adicionarFavorito(produto)
      addToast("Adicionado aos favoritos", "success")
    }
  }

  const handleAdicionarCarrinho = () => {
    adicionarProduto(produto)
    addToast("Produto adicionado ao carrinho!", "success")
  }

  return (
    <article className="produto-card">
      {produto.promocao && <span className="produto-sale-badge">Promoção</span>}
      {produto.novidade && <span className="produto-new-badge">Novo</span>}

      <Link to={`/produto/${produto.id}`} className="produto-card-link">
        <ImageLoader src={produto.imagens[0]} alt={produto.nome} className="produto-card-imagem" />
      </Link>

      {/* Botão de Favorito */}
      <button onClick={toggleFavorito} className="produto-card-favorito" aria-label="Favorito">
        <i className={isFavorito ? "fas fa-heart" : "far fa-heart"}></i>
      </button>

      <div className="produto-card-info">
        {produto.marca && <p className="produto-card-marca">{produto.marca}</p>}
        {produto.jogador && <h3 className="produto-card-jogador">{produto.jogador}</h3>}
        {produto.equipa && <p className="produto-card-equipa">{produto.equipa}</p>}
        <p className="produto-card-preco">€{produto.preco.toFixed(2)}</p>

        {hasTamanhos ? (
          <Link to={`/produto/${produto.id}`} className="produto-add-btn">
            Comprar
          </Link>
        ) : (
          <button className="produto-add-btn" onClick={handleAdicionarCarrinho}>
            Comprar
          </button>
        )}
      </div>
    </article>
  )
}

export default ProdutoCard;