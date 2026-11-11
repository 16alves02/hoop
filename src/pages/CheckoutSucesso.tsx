import { Navigate, useLocation } from "react-router-dom"
import "../styles/Checkout.css"

function CheckoutSucesso() {
  const location = useLocation()
  const checkoutState = location.state as { totalPago?: unknown; entrega?: { nome: string; email: string; morada: string; cidade: string; codigoPostal: string; telefone: string } } | null
  const totalPago = checkoutState?.totalPago
  const entrega = checkoutState?.entrega

  // A página de sucesso só é válida após a conclusão desta navegação.
  if (typeof totalPago !== "number" || !Number.isFinite(totalPago) || totalPago < 0 || !entrega) {
    return <Navigate to="/carrinho" replace />
  }

  return (
    <div className="checkout-page checkout-sucesso">
      <h1>Simulação concluída</h1>
      <p>Esta foi apenas uma demonstração académica. Não foi realizada qualquer compra, pagamento ou envio de email.</p>

      {entrega && (
        <section aria-label="Dados introduzidos na demonstração" className="checkout-resumo">
          <h2>Dados de entrega introduzidos</h2>
          <p>{entrega.nome}</p>
          <p>{entrega.email}</p>
          <p>{entrega.morada}</p>
          <p>{entrega.codigoPostal} {entrega.cidade}</p>
          <p>{entrega.telefone}</p>
          <p>Estes dados foram apenas transportados durante a demonstração e não foram guardados nem enviados.</p>
        </section>
      )}

      <p style={{ fontSize: "1.2rem", margin: "1.5rem 0" }}>
        Total apresentado na simulação: <strong>€{totalPago.toFixed(2)}</strong>
      </p>

      <button
        className="checkout-btn"
        onClick={() => (window.location.href = "/")}
      >
        Voltar à Home
      </button>

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
