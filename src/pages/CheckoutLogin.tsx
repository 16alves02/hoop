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
  const auth = useContext(AuthContext)

  if (!auth) return null

  const handleLogin = (provider: "google" | "apple" | "email" | "outlook") => {
    auth.login({
      nome: `Utilizador HOOP (${provider})`,
      email: `user@${provider}.com`,
      provider
    })
    navigate("/checkout/entrega")
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="checkout-page checkout-login">
          <div className="checkout-progress">
            <div className="checkout-step ativo"><FaUser /></div>
            <div className="checkout-step"><FaHome /></div>
            <div className="checkout-step"><FaCreditCard /></div>
            <div className="checkout-step"><FaCheckCircle /></div>
          </div>

      <h1 className="checkout-titulo">Inicia Sessão ou Regista-te</h1>

      <div className="checkout-login-content">
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
          Não tens conta? <span onClick={handleSignup}>Regista-te aqui</span>
        </p>
      </div>
    </div>
  )
}

export default CheckoutLogin;