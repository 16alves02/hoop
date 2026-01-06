import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { ToastContext } from "../context/ToastContext"
import "../styles/Carrinho.css"

function Carrinho() {
  const navigate = useNavigate()

  // Puxo tudo o que preciso do contexto do carrinho
  // Aqui tenho os itens, funções para remover e alterar quantidades e o total de itens
  const { itens, removerProduto, alterarQuantidade, carrinhoQtd } = useContext(CarrinhoContext)

  // Contexto dos toasts para dar feedback ao utilizador
  const { addToast } = useContext(ToastContext)

  // Cálculo simples do total do carrinho
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  // Função para remover um produto e mostrar um toast
  const handleRemover = (id: number) => {
    removerProduto(id)
    addToast("Produto removido do carrinho", "info")
  }

  // Função para alterar a quantidade de um item
  const handleAlterarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return
    alterarQuantidade(id, novaQuantidade)
    addToast("Quantidade atualizada", "success")
  }

  // Se o carrinho estiver vazio, mostro uma página dedicada
  if (itens.length === 0) {
    return (
      <div className="carrinho-page">
        <div className="carrinho-vazio">
          <h2>O teu carrinho está vazio</h2>
          <p>Explora a coleção e adiciona os teus produtos favoritos</p>
          <Link to="/produtos" className="carrinho-vazio-btn">
            Ver Produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="carrinho-page">
      {/* Título com o número total de itens */}
      <h1 className="carrinho-titulo">Carrinho ({carrinhoQtd} itens)</h1>

      <div className="carrinho-itens">
        {itens.map(item => (
          <div key={item.id} className="carrinho-item">

            {/* Imagem do produto com link para a página dele */}
            <Link to={`/produto/${item.id}`} className="carrinho-item-img-link">
              <img src={item.imagens[0]} alt={item.nome} className="carrinho-item-img" />
            </Link>

            <div className="carrinho-item-info">
              {/* Nome do produto com link */}
              <Link to={`/produto/${item.id}`} className="carrinho-item-nome">
                <h3>{item.nome}</h3>
              </Link>

              {/* Info extra só aparece se existir */}
              {item.jogador && <p className="carrinho-item-jogador">{item.jogador}</p>}
              {item.equipa && <p className="carrinho-item-equipa">{item.equipa}</p>}

              {/* Preço por unidade */}
              <p className="carrinho-item-preco-unidade">€{item.preco.toFixed(2)}</p>

              {/* Controlo de quantidade */}
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

              {/* Subtotal do item */}
              <p className="carrinho-item-subtotal">
                Subtotal: €{(item.preco * item.quantidade).toFixed(2)}
              </p>

              {/* Botão para remover o item */}
              <button className="carrinho-remover" onClick={() => handleRemover(item.id)}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo final do carrinho */}
      <div className="carrinho-resumo">
        <div className="carrinho-total">
          <h2>Total: €{total.toFixed(2)}</h2>
        </div>

        {/* Botão para avançar para o checkout */}
        <button className="carrinho-finalizar" onClick={() => navigate("/checkout/login")}>
          Finalizar Compra
        </button>

        {/* Link para voltar aos produtos */}
        <Link to="/produtos" className="carrinho-continuar">
          ← Continuar a comprar
        </Link>
      </div>
    </div>
  )
}

export default Carrinho;