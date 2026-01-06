import { useState, useContext } from "react"
import { ToastContext } from "../context/ToastContext"
import "../styles/Contacto.css"

function Contacto() {
  // Puxo o contexto dos toasts para mostrar feedback ao utilizador
  const { addToast } = useContext(ToastContext)

  // Estado simples para guardar os valores do formulário
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" })

  // Estado para mostrar a mensagem de sucesso depois de enviar
  const [enviado, setEnviado] = useState(false)

  // Atualiza o estado sempre que o utilizador escreve num campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Quando o utilizador submete o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica: todos os campos obrigatórios
    if (!formData.nome || !formData.email || !formData.mensagem) {
      addToast("Preenche todos os campos!", "error")
      return
    }

    // Simulação de envio da mensagem
    addToast("Mensagem enviada com sucesso! Obrigado.", "success")

    // Mostro a mensagem de sucesso
    setEnviado(true)

    // Limpo o formulário
    setFormData({ nome: "", email: "", mensagem: "" })

    // Escondo a mensagem de sucesso passado uns segundos
    setTimeout(() => setEnviado(false), 5000)
  }

  return (
    <div className="contacto-page">
      <h1 className="contacto-titulo">Contacto</h1>

      {/* Mensagem de sucesso depois do envio */}
      {enviado && (
        <p className="contacto-sucesso">
          Mensagem enviada! Vamos responder em breve
        </p>
      )}

      {/* Formulário de contacto */}
      <form onSubmit={handleSubmit} className="contacto-form">

        <div className="contacto-form-group">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            className="contacto-input"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="contacto-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-form-group">
          <textarea
            name="mensagem"
            placeholder="Mensagem"
            rows={8}
            className="contacto-input"
            value={formData.mensagem}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-form-submit">
          <button type="submit" className="contacto-btn">
            Enviar Mensagem
          </button>
        </div>

      </form>
    </div>
  )
}

export default Contacto;