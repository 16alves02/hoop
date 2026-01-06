import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContextValue"
import { ToastContext } from "../context/ToastContext"
import "../styles/Checkout.css"

interface EncomendaHistorico {
  id: string
  data: string
  total: number
  itens: number
  status: "confirmada" | "enviada" | "entregue"
}

function Perfil() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { addToast } = useContext(ToastContext)

  if (!auth?.isAuthenticated || !auth.user) {
    navigate("/")
    return null
  }

  const { user, logout } = auth

  // Histórico de encomendas simulado
  const historico: EncomendaHistorico[] = (() => {
    try {
      const stored = localStorage.getItem("hoop_encomendas")
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })()

  const handleLogout = () => {
    logout()
    addToast("Sessão terminada com sucesso", "info")
    navigate("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada": return "#f2b01e"
      case "enviada": return "#2196f3"
      case "entregue": return "#4caf50"
      default: return "#666"
    }
  }

  return (
    <div className="checkout-page" style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1 className="checkout-titulo">A Minha Conta</h1>

      <div className="checkout-card">
        <h2>Informações Pessoais</h2>
        <div style={{ margin: "1.5rem 0", lineHeight: "1.8" }}>
          <p><strong>Nome:</strong> {user.nome}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Autenticado via:</strong> {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}</p>
        </div>

        <button onClick={handleLogout} className="checkout-btn" style={{ background: "#e53935" }}>
          Terminar Sessão
        </button>
      </div>

      <div className="checkout-card" style={{ marginTop: "2rem" }}>
        <h2>Histórico de Encomendas</h2>

        {historico.length === 0 ? (
          <p style={{ textAlign: "center", padding: "2rem", color: "#aaa" }}>
            Ainda não tens encomendas.<br />
            Quando finalizares uma compra, aparecerá aqui!
          </p>
        ) : (
          <div className="encomendas-lista">
            {historico.map((enc) => (
              <div key={enc.id} className="encomenda-item">
                <div>
                  <strong>Encomenda #{enc.id.slice(0, 8)}</strong>
                  <p style={{ color: "#888", fontSize: "0.9rem" }}>{enc.data}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p>{enc.itens} item{enc.itens !== 1 ? "s" : ""}</p>
                  <p style={{ fontWeight: "bold" }}>€{enc.total.toFixed(2)}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      background: getStatusColor(enc.status),
                      color: "white",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      textTransform: "capitalize"
                    }}
                  >
                    {enc.status}
                  </span>
                </div>
                <button
                  className="ver-encomenda-btn"
                  onClick={() => addToast("Detalhes da encomenda: " + enc.id, "info")}
                >
                  Ver Encomenda
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Perfil;