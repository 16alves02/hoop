import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContextValue"
import "../styles/SignUp.css"

function Signup() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [form, setForm] = useState({ nome: "", email: "", password: "" }) // Password simulada, não usada

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (auth) {
      auth.login({
        nome: form.nome,
        email: form.email,
        provider: "email"
      })
      navigate("/")
    }
  }

  return (
    <div className="signup-page">
      <h1>Registo</h1>
      <form onSubmit={handleSubmit} className="signup-form-content">
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" className="signup-btn">Registar e Continuar</button>
      </form>
    </div>
  )
}

export default Signup;