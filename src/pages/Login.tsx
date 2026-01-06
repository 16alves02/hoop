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
  const auth = useContext(AuthContext)
  const { addToast } = useContext(ToastContext)

  if (!auth) return null

  const { login } = auth

  const handleLogin = (provider: "google" | "apple" | "email" | "outlook") => {
    // Simulação de login (igual ao CheckoutLogin)
    const fakeUser = {
      nome: provider === "google" ? "Leonardo Alves" : "Utilizador HOOP",
      email: `user@${provider}.com`,
      provider,
    }
    login(fakeUser)
    addToast(`Bem-vindo de volta, ${fakeUser.nome}!`, "success")
    navigate(-1) // Volta para onde estava (ex: perfil, home)
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="checkout-page" style={{ maxWidth: "500px", margin: "4rem auto" }}>
      <div className="checkout-card">
        <h1 className="checkout-titulo">Iniciar Sessão</h1>

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

          <p className="checkout-signup-link">
            Não tens conta? <span onClick={handleSignup} style={{ cursor: "pointer", color: "#f2b01e" }}>Regista-te aqui</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;