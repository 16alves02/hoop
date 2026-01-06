import { useState, useContext } from "react"
import { ToastContext } from "../context/ToastContext"
import "../styles/Contacto.css"

function Contacto() {
  const { addToast } = useContext(ToastContext)
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nome || !formData.email || !formData.mensagem) {
      addToast("Preenche todos os campos!", "error")
      return
    }

    // Simula envio
    addToast("Mensagem enviada com sucesso! Obrigado.", "success")
    setEnviado(true)
    setFormData({ nome: "", email: "", mensagem: "" })
    setTimeout(() => setEnviado(false), 5000)
  }

  return (
    <div className="contacto-page">
      <h1 className="contacto-titulo">Contacto</h1>

      {enviado && <p className="contacto-sucesso">Mensagem enviada! Vamos responder em breve.</p>}

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