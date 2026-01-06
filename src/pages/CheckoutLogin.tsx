import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContextValue"
import "../styles/Checkout.css"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FaMicrosoft } from 'react-icons/fa'
import { FaUser, FaCreditCard } from "react-icons/fa6"
import { FaHome, FaCheckCircle } from "react-icons/fa"

function CheckoutLogin() {
  const navigate = useNavigate()

  // Puxo o contexto da autenticação para saber se há user e para fazer login
  const auth = useContext(AuthContext)

  // Se por algum motivo o contexto não existir, não renderizo nada
  if (!auth) return null

  // Função simples para simular login com diferentes providers
  // Aqui não há autenticação real, é só para avançar no checkout
  const handleLogin = (provider: "google" | "apple" | "email" | "outlook") => {
    auth.login({
      nome: `Utilizador HOOP (${provider})`,
      email: `user@${provider}.com`,
      provider
    })
    navigate("/checkout/entrega")
  }

  // Caso o utilizador queira criar conta em vez de login rápido
  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="checkout-page checkout-login">

      {/* Barra de progresso do checkout */}
      <div className="checkout-progress">
        <div className="checkout-step ativo"><FaUser /></div>
        <div className="checkout-step"><FaHome /></div>
        <div className="checkout-step"><FaCreditCard /></div>
        <div className="checkout-step"><FaCheckCircle /></div>
      </div>

      <h1 className="checkout-titulo">Inicia Sessão ou Regista-te</h1>

      <div className="checkout-login-content">

        {/* Login rápido com Google */}
        <button className="checkout-login-btn" onClick={() => handleLogin("google")}>
          <FcGoogle size={22} /> Continuar com Google
        </button>

        {/* Login rápido com Apple */}
        <button className="checkout-login-btn" onClick={() => handleLogin("apple")}>
          <FaApple size={22} /> Continuar com Apple
        </button>

        {/* Login rápido com Outlook */}
        <button className="checkout-login-btn" onClick={() => handleLogin("outlook")}>
          <FaMicrosoft size={22} /> Continuar com Outlook
        </button>

        {/* Login rápido com Email */}
        <button className="checkout-login-btn" onClick={() => handleLogin("email")}>
          <MdEmail size={22} /> Continuar com Email
        </button>

        {/* Link para registo */}
        <p className="checkout-signup-link">
          Não tens conta? <span onClick={handleSignup}>Regista-te aqui</span>
        </p>
      </div>
    </div>
  )
}

export default CheckoutLogin;