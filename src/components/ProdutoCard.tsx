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
  // Contexto do carrinho, onde tenho a função para adicionar produtos
  const { adicionarProduto } = useContext(CarrinhoContext)

  // Contexto dos favoritos, onde controlo se um produto está ou não guardado
  const { adicionarFavorito, removerFavorito, estaNosFavoritos } = useContext(FavoritosContext)

  // Contexto dos toasts, para mostrar notificações rápidas
  const { addToast } = useContext(ToastContext)

  // Verifico se o produto tem tamanhos, porque isso muda o comportamento do botão Comprar
  const hasTamanhos = produto.tamanhos && produto.tamanhos.length > 0

  // Verifico se o produto já está nos favoritos
  const isFavorito = estaNosFavoritos(produto.id)

  // Função para alternar entre adicionar e remover dos favoritos
  // Uso preventDefault e stopPropagation para não abrir a página do produto quando clico no coração
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

  // Função simples para adicionar o produto ao carrinho
  const handleAdicionarCarrinho = () => {
    adicionarProduto(produto)
    addToast("Produto adicionado ao carrinho!", "success")
  }

  return (
    <article className="produto-card">
      {/* Badges de promoção e novidade, só aparecem se existirem */}
      {produto.promocao && <span className="produto-sale-badge">Promoção</span>}
      {produto.novidade && <span className="produto-new-badge">Novo</span>}

      {/* Link para a página do produto, com a imagem carregada pelo ImageLoader */}
      <Link to={`/produto/${produto.id}`} className="produto-card-link">
        <ImageLoader src={produto.imagens[0]} alt={produto.nome} className="produto-card-imagem" />
      </Link>

      {/* Botão do favorito, fica por cima da imagem */}
      <button onClick={toggleFavorito} className="produto-card-favorito" aria-label="Favorito">
        <i className={isFavorito ? "fas fa-heart" : "far fa-heart"}></i>
      </button>

      <div className="produto-card-info">
        {/* Mostro marca, jogador e equipa só se existirem no produto */}
        {produto.marca && <p className="produto-card-marca">{produto.marca}</p>}
        {produto.jogador && <h3 className="produto-card-jogador">{produto.jogador}</h3>}
        {produto.equipa && <p className="produto-card-equipa">{produto.equipa}</p>}

        {/* Preço formatado com duas casas decimais */}
        <p className="produto-card-preco">€{produto.preco.toFixed(2)}</p>

        {/* Se o produto tiver tamanhos, mando o utilizador para a página do produto
            Se não tiver tamanhos (ex: acessórios), adiciono logo ao carrinho */}
        {hasTamanhos ? (
          <Link to={`/produto/${produto.id}`} className="produto-add-btn">
            Comprar
          </Link>
        ) : (
         <button className="produto-add-btn" onClick={handleAdicionarCarrinho} aria-label="Comprar produto">
            Comprar
         </button>

        )}
      </div>
    </article>
  )
}

export default ProdutoCard;