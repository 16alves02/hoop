import { useState, useEffect, useContext } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { ToastContext } from "../context/ToastContext"
import "../styles/Checkout.css"

function CheckoutSucesso() {
  // Puxo o carrinho para saber os itens e para limpar depois de registar a encomenda
  const { itens, limparCarrinho } = useContext(CarrinhoContext)

  // Toasts para feedback rápido ao utilizador
  const { addToast } = useContext(ToastContext)

  // Estado para guardar o total pago (mostrado no ecrã)
  const [totalPago, setTotalPago] = useState(0)

  // Quando a página abre, registo a encomenda no histórico e limpo o carrinho
  useEffect(() => {
    // Só faço isto se ainda houver itens (evita duplicações caso o user recarregue a página)
    if (itens.length > 0) {

      // Calculo o total da compra
      const totalCalculado = itens.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
      )

      setTotalPago(totalCalculado)

      // Crio o objeto da nova encomenda para guardar no histórico
      const novaEncomenda = {
        id: "ORD-" + Date.now().toString(36).toUpperCase(), // ID simples mas único
        data: new Date().toLocaleDateString("pt-PT"),
        total: totalCalculado,
        itens: itens.reduce((acc, i) => acc + i.quantidade, 0),
        status: "confirmada" as const,
      }

      // Puxo o histórico atual do localStorage
      const historicoAtual = (() => {
        try {
          const stored = localStorage.getItem("hoop_encomendas")
          return stored ? JSON.parse(stored) : []
        } catch {
          return []
        }
      })()

      // Adiciono a nova encomenda ao topo e limito a 10 entradas
      const novoHistorico = [novaEncomenda, ...historicoAtual].slice(0, 10)
      localStorage.setItem("hoop_encomendas", JSON.stringify(novoHistorico))

      // Limpo o carrinho porque a compra já foi concluída
      limparCarrinho()

      // Mostro um toast de sucesso
      addToast("Encomenda confirmada com sucesso!", "success")
    }
  }, [])

  return (
    <div className="checkout-page checkout-sucesso">
      <h1>Encomenda Confirmada!</h1>
      <p>Obrigado pela tua compra. Vais receber um email em breve</p>

      {/* Mostro o total pago com destaque */}
      <p style={{ fontSize: "1.2rem", margin: "1.5rem 0" }}>
        Total pago: <strong>€{totalPago.toFixed(2)}</strong>
      </p>

      {/* Botão para voltar à home */}
      <button
        className="checkout-btn"
        onClick={() => (window.location.href = "/")}
      >
        Voltar à Home
      </button>

      {/* Botão para ir ao perfil ver a encomenda no histórico */}
      <button
        className="checkout-btn"
        onClick={() => (window.location.href = "/perfil")}
      >
        Ver na Minha Conta
      </button>
    </div>
  )
}

export default CheckoutSucesso;