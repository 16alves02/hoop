import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContextValue"
import "../styles/SignUp.css"

function Signup() {
  const navigate = useNavigate()

  // Contexto de autenticação - onde guardo o user depois de "registar"
  const auth = useContext(AuthContext)

  // Estado simples do formulário (password é só decorativa, não é usada)
  const [form, setForm] = useState({ nome: "", email: "", password: "" })

  // Atualiza o estado sempre que o utilizador escreve num input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Submissão do formulário
  // Aqui não existe backend, por isso o "registo" é só simulado
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (auth) {
      // Simulo o registo criando um user no contexto
      auth.login({
        nome: form.nome,
        email: form.email,
        provider: "email" // Indico que o login foi via email
      })

      // Depois de "registar", mando o user para a home
      navigate("/")
    }
  }

  return (
    <div className="signup-page">
      <h1>Registo</h1>

      {/* Formulário simples de registo */}
      <form onSubmit={handleSubmit} className="signup-form-content">

        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-btn">
          Registar e Continuar
        </button>
      </form>
    </div>
  )
}

export default Signup;