import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContextValue"
import { ToastContext } from "../context/ToastContext"
import "../styles/Checkout.css"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FaMicrosoft } from "react-icons/fa"

function Login() {
  const navigate = useNavigate()

  // Puxo o contexto da autenticação para fazer login
  const auth = useContext(AuthContext)

  // Toasts para feedback rápido ao utilizador
  const { addToast } = useContext(ToastContext)

  // Se por algum motivo o contexto não existir, não renderizo nada
  if (!auth) return null

  const { login } = auth

  // Função que simula login com diferentes providers
  // Aqui não há autenticação real, é só para avançar no fluxo da app
  const handleLogin = (provider: "google" | "apple" | "email" | "outlook") => {
    // User fake só para simular login
    const fakeUser = {
      nome: provider === "google" ? "Leonardo Alves" : "Utilizador HOOP",
      email: `user@${provider}.com`,
      provider,
    }

    // Atualiza o contexto com o user
    login(fakeUser)

    // Mostra mensagem de boas-vindas
    addToast(`Bem-vindo de volta, ${fakeUser.nome}!`, "success")

    // Volta para a página anterior (ex: perfil, home)
    navigate(-1)
  }

  // Se o utilizador quiser criar conta em vez de login rápido
  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="checkout-page" style={{ maxWidth: "500px", margin: "4rem auto" }}>
      <div className="checkout-card">
        <h1 className="checkout-titulo">Iniciar Sessão</h1>

        {/* Botões de login rápido com diferentes providers */}
        <div className="checkout-login-options">

          <button className="checkout-login-btn" onClick={() => handleLogin("google")}>
            <FcGoogle size={22} /> Continuar com Google
          </button>

          <button className="checkout-login-btn" onClick={() => handleLogin("apple")}>
            <FaApple size={22} /> Continuar com Apple
          </button>

          <button className="checkout-login-btn" onClick={() => handleLogin("outlook")}>
            <FaMicrosoft size={22} /> Continuar com Outlook
          </button>

          <button className="checkout-login-btn" onClick={() => handleLogin("email")}>
            <MdEmail size={22} /> Continuar com Email
          </button>

          {/* Link para registo */}
          <p className="checkout-signup-link">
            Não tens conta?{" "}
            <span
              onClick={handleSignup}
              style={{ cursor: "pointer", color: "#f2b01e" }}
            >
              Regista-te aqui
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;