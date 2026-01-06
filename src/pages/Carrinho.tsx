import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { ToastContext } from "../context/ToastContext"
import "../styles/Carrinho.css"

function Carrinho() {
  const navigate = useNavigate()
  const { itens, removerProduto, alterarQuantidade, carrinhoQtd } = useContext(CarrinhoContext)
  const { addToast } = useContext(ToastContext)

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  const handleRemover = (id: number) => {
    removerProduto(id)
    addToast("Produto removido do carrinho", "info")
  }

  const handleAlterarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return
    alterarQuantidade(id, novaQuantidade)
    addToast("Quantidade atualizada", "success")
  }

  if (itens.length === 0) {
    return (
      <div className="carrinho-page">
        <div className="carrinho-vazio">
          <h2>O teu carrinho está vazio</h2>
          <p>Explora a coleção e adiciona os teus produtos favoritos.</p>
          <Link to="/produtos" className="carrinho-vazio-btn">
            Ver Produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="carrinho-page">
      <h1 className="carrinho-titulo">Carrinho ({carrinhoQtd} itens)</h1>

      <div className="carrinho-itens">
        {itens.map((item) => (
          <div key={item.id} className="carrinho-item">
            <Link to={`/produto/${item.id}`} className="carrinho-item-img-link">
              <img src={item.imagens[0]} alt={item.nome} className="carrinho-item-img" />
            </Link>

            <div className="carrinho-item-info">
              <Link to={`/produto/${item.id}`} className="carrinho-item-nome">
                <h3>{item.nome}</h3>
              </Link>

              {item.jogador && <p className="carrinho-item-jogador">{item.jogador}</p>}
              {item.equipa && <p className="carrinho-item-equipa">{item.equipa}</p>}

              <p className="carrinho-item-preco-unidade">€{item.preco.toFixed(2)}</p>

              <div className="carrinho-quantidade">
                <button
                  onClick={() => handleAlterarQuantidade(item.id, item.quantidade - 1)}
                  disabled={item.quantidade === 1}
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span>{item.quantidade}</span>
                <button
                  onClick={() => handleAlterarQuantidade(item.id, item.quantidade + 1)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>

              <p className="carrinho-item-subtotal">
                Subtotal: €{(item.preco * item.quantidade).toFixed(2)}
              </p>

              <button className="carrinho-remover" onClick={() => handleRemover(item.id)}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="carrinho-resumo">
        <div className="carrinho-total">
          <h2>Total: €{total.toFixed(2)}</h2>
        </div>

        <button className="carrinho-finalizar" onClick={() => navigate("/checkout/login")}>
          Finalizar Compra
        </button>

        <Link to="/produtos" className="carrinho-continuar">
          ← Continuar a comprar
        </Link>
      </div>
    </div>
  )
}

export default Carrinho;