import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { produtos } from "../data/produtos"
import type { Produto } from "../data/produtos"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { FavoritosContext } from "../context/FavoritosContext"
import { AuthContext } from "../context/AuthContextValue"
import { ToastContext } from "../context/ToastContext"
import "../styles/ProdutoDetalhes.css"

interface Review {
  nome: string
  estrelas: number
  comentario: string
  data: string
}

function ProdutoDetalhes() {
  const { id } = useParams<{ id: string }>()
  const produto: Produto | undefined = produtos.find(p => p.id === Number(id))

  const { adicionarProduto } = useContext(CarrinhoContext)
  const { adicionarFavorito, removerFavorito, estaNosFavoritos } = useContext(FavoritosContext)
  const auth = useContext(AuthContext)
  const { addToast } = useContext(ToastContext)

  const [imagemAtiva, setImagemAtiva] = useState(0)
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>()
  const [erroTamanho, setErroTamanho] = useState(false)

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([])
  const [novaEstrelas, setNovaEstrelas] = useState(5)
  const [novoComentario, setNovoComentario] = useState("")
  const [nomeReviewer, setNomeReviewer] = useState(auth?.user?.nome || "Anónimo")

  if (!produto) {
    return <p className="text-center">Produto não encontrado.</p>
  }

  const temTamanhos =
    Array.isArray(produto.tamanhos) && produto.tamanhos.length > 0

  const isFavorito = estaNosFavoritos(produto.id)

  useEffect(() => {
    if (produto.reviews) {
      setReviews(produto.reviews)
    }
  }, [produto])

  const handleAdicionar = () => {
    if (temTamanhos) {
      if (!tamanhoSelecionado) {
        setErroTamanho(true)
        addToast("Por favor, seleciona um tamanho.", "error")
        return
      }
      adicionarProduto(produto, tamanhoSelecionado)
    } else {
      adicionarProduto(produto)
    }

    addToast("Produto adicionado ao carrinho!", "success")
    setErroTamanho(false)
  }

  const toggleFavorito = () => {
    if (isFavorito) {
      removerFavorito(produto.id)
      addToast("Removido dos favoritos", "info")
    } else {
      adicionarFavorito(produto)
      addToast("Adicionado aos favoritos", "success")
    }
  }

  const submeterReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!novoComentario.trim()) {
      addToast("Escreve um comentário antes de enviar.", "error")
      return
    }

    const novaReview: Review = {
      nome: nomeReviewer || "Anónimo",
      estrelas: novaEstrelas,
      comentario: novoComentario,
      data: new Date().toLocaleDateString("pt-PT"),
    }

    setReviews(prev => [novaReview, ...prev])

    addToast("Obrigado pela tua avaliação!", "success")
    setNovoComentario("")
    setNovaEstrelas(5)
  }

  return (
    <div className="produto-detalhes-page">
      <div className="produto-detalhes-container">
        <div className="produto-detalhes-galeria">
          <img
            src={produto.imagens[imagemAtiva]}
            alt={produto.nome}
            className="produto-detalhes-imagem-principal"
          />

          <div className="produto-detalhes-miniaturas">
            {produto.imagens.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${produto.nome} ${i + 1}`}
                className={`produto-detalhes-miniatura ${i === imagemAtiva ? "ativa" : ""}`}
                onClick={() => setImagemAtiva(i)}
              />
            ))}
          </div>
        </div>

        <div className="produto-detalhes-info">
          <h1>{produto.jogador || produto.nome}</h1>
          {produto.equipa && <p className="produto-equipa">{produto.equipa}</p>}
          <p className="produto-preco">€{produto.preco.toFixed(2)}</p>

          <button onClick={toggleFavorito} className="favorito-btn-detalhes">
            <i className={isFavorito ? "fas fa-heart" : "far fa-heart"}></i>
            {isFavorito ? " Remover dos Favoritos" : " Adicionar aos Favoritos"}
          </button>

          {temTamanhos && (
            <div className="tamanhos">
              <h3>Escolhe o tamanho:</h3>
              <div className="tamanhos-lista">
                {produto.tamanhos!.map(t => (
                  <button
                    key={t}
                    className={tamanhoSelecionado === t ? "ativo" : ""}
                    onClick={() => {
                      setTamanhoSelecionado(t)
                      setErroTamanho(false)
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {erroTamanho && <p className="erro-tamanho">Seleciona um tamanho.</p>}
            </div>
          )}

          <button onClick={handleAdicionar} className="produto-add-btn-detalhes">
            Adicionar ao Carrinho
          </button>

          <div className="produto-descricao">
            <h3>Descrição</h3>
            <p>{produto.descricao}</p>
          </div>
        </div>
      </div>

      <div className="reviews-seccao">
        <h2>Avaliações</h2>

        <div className="reviews-nova">
          <h3>Deixa a tua avaliação</h3>
          <form onSubmit={submeterReview}>
            <div className="reviews-estrelas-input">
              {[1, 2, 3, 4, 5].map(s => (
                <span
                  key={s}
                  className={`estrela ${s <= novaEstrelas ? "ativa" : ""}`}
                  onClick={() => setNovaEstrelas(s)}
                >
                  ★
                </span>
              ))}
            </div>

            <input
              type="text"
              placeholder="O teu nome (opcional)"
              value={nomeReviewer}
              onChange={e => setNomeReviewer(e.target.value)}
            />

            <textarea
              placeholder="Escreve aqui a tua opinião..."
              value={novoComentario}
              onChange={e => setNovoComentario(e.target.value)}
              rows={5}
              required
            />

            <button type="submit" className="checkout-btn">
              Enviar Avaliação
            </button>
          </form>
        </div>

        <div className="reviews-lista">
          {reviews.length > 0 ? (
            reviews.map((r, i) => (
              <div key={i} className="review-item">
                <div className="review-header">
                  <strong>{r.nome}</strong>
                  <span className="review-data">{r.data}</span>
                </div>
                <div className="review-estrelas">
                  {"★".repeat(r.estrelas)}{"☆".repeat(5 - r.estrelas)}
                </div>
                <p className="review-comentario">{r.comentario}</p>
              </div>
            ))
          ) : (
            <p>Ainda não há avaliações. Sê o primeiro!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProdutoDetalhes;