import { useState, useEffect, useContext } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { ToastContext } from "../context/ToastContext"
import "../styles/Checkout.css"

function CheckoutSucesso() {
  const { itens, limparCarrinho } = useContext(CarrinhoContext)
  const { addToast } = useContext(ToastContext)

  const [totalPago, setTotalPago] = useState(0)

  useEffect(() => {
    if (itens.length > 0) {
    const totalCalculado = itens.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    )

    setTotalPago(totalCalculado)

     const novaEncomenda = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      data: new Date().toLocaleDateString("pt-PT"),
      total: totalCalculado,
      itens: itens.reduce((acc, i) => acc + i.quantidade, 0),
      status: "confirmada" as const,
    }

      const historicoAtual = (() => {
        try {
          const stored = localStorage.getItem("hoop_encomendas")
          return stored ? JSON.parse(stored) : []
        } catch {
          return []
        }
      })()

      const novoHistorico = [novaEncomenda, ...historicoAtual].slice(0, 10) // Máximo 10 encomendas
      localStorage.setItem("hoop_encomendas", JSON.stringify(novoHistorico))

      // Limpa o carrinho
      limparCarrinho()
      addToast("Encomenda confirmada com sucesso!", "success")
    }
  }, [])

  return (
    <div className="checkout-page checkout-sucesso">
      <h1>Encomenda Confirmada!</h1>
      <p>Obrigado pela tua compra. Vais receber um email em breve.</p>
      <p style={{ fontSize: "1.2rem", margin: "1.5rem 0" }}>
        Total pago: <strong>€{totalPago.toFixed(2)}</strong>
      </p>
      <button className="checkout-btn" onClick={() => window.location.href = "/"}>
        Voltar à Home
      </button>
      <button
        className="checkout-btn"
        onClick={() => window.location.href = "/perfil"}
      >
        Ver na Minha Conta
      </button>
    </div>
  )
}

export default CheckoutSucesso;