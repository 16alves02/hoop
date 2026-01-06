import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContextValue"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { FaUser, FaCreditCard } from "react-icons/fa6"
import { FaHome, FaCheckCircle } from "react-icons/fa"
import "../styles/Checkout.css"

interface FormErrors {
  morada?: string
  cidade?: string
  codigoPostal?: string
  telefone?: string
}

function CheckoutEntrega() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const carrinho = useContext(CarrinhoContext)

  const [form, setForm] = useState(() => ({
    nome: auth?.user?.nome ?? "",
    email: auth?.user?.email ?? "",
    morada: "",
    cidade: "",
    codigoPostal: "",
    telefone: ""
  }))

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  if (!auth?.user || !carrinho) return null

  const { itens } = carrinho
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setTouched({ ...touched, [name]: true })

    // Limpa erro do campo ao escrever
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name as keyof FormErrors]: undefined })
    }
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!form.morada.trim()) {
      newErrors.morada = "A morada é obrigatória"
    } else if (form.morada.trim().length < 5) {
      newErrors.morada = "A morada deve ter pelo menos 5 caracteres"
    }

    if (!form.cidade.trim()) {
      newErrors.cidade = "A cidade é obrigatória"
    } else if (!/^[a-zA-ZÀ-ú\s-]+$/.test(form.cidade.trim())) {
      newErrors.cidade = "Cidade inválida (apenas letras, espaços e hífenes)"
    }

    const cpRegex = /^\d{4}-\d{3}$/
    if (!form.codigoPostal.trim()) {
      newErrors.codigoPostal = "O código postal é obrigatório"
    } else if (!cpRegex.test(form.codigoPostal.trim())) {
      newErrors.codigoPostal = "Formato inválido. Use 0000-000"
    }

    const phoneRegex = /^[9][0-9]{8}$/
    if (!form.telefone.trim()) {
      newErrors.telefone = "O telefone é obrigatório"
    } else if (!phoneRegex.test(form.telefone.trim().replace(/\s/g, ""))) {
      newErrors.telefone = "Telemóvel inválido. Deve começar por 9 e ter 9 dígitos"
    }

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Marca todos os campos como touched para mostrar erros
      setTouched({
        morada: true,
        cidade: true,
        codigoPostal: true,
        telefone: true
      })
      return
    }

    // Tudo válido -> prossegue para pagamento
    // Aqui poderias guardar os dados de entrega no contexto ou localStorage se quiseres usar depois
    navigate("/checkout/pagamento")
  }

  const formatCodigoPostal = (value: string) => {
    // Auto-formata para 0000-000
    const digits = value.replace(/\D/g, "")
    if (digits.length >= 4) {
      return `${digits.slice(0, 4)}-${digits.slice(4, 7)}`
    }
    return digits
  }

  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    return digits.slice(0, 9)
  }

  return (
    <div className="checkout-page">
          <div className="checkout-progress">
            <div className="checkout-step ativo"><FaUser /></div>
            <div className="checkout-step ativo"><FaHome /></div>
            <div className="checkout-step"><FaCreditCard /></div>
            <div className="checkout-step"><FaCheckCircle /></div>
          </div>

      <div className="checkout-entrega-container">
        {/* Coluna esquerda – Formulário */}
        <div className="checkout-form-left">
          <h2>Dados de Entrega</h2>

          <form className="checkout-form-content" onSubmit={handleSubmit} noValidate>

            <div className="checkout-form-group">
              <input
                name="morada"
                placeholder="Morada completa (rua, nº, andar...)"
                value={form.morada}
                onChange={handleChange}
                required
                className={touched.morada && errors.morada ? "error" : ""}
              />
              {touched.morada && errors.morada && <span className="error-message">{errors.morada}</span>}
            </div>

            <div className="checkout-form-group">
              <input
                name="cidade"
                placeholder="Cidade"
                value={form.cidade}
                onChange={handleChange}
                required
                className={touched.cidade && errors.cidade ? "error" : ""}
              />
              {touched.cidade && errors.cidade && <span className="error-message">{errors.cidade}</span>}
            </div>

            <div className="checkout-form-group">
              <input
                name="codigoPostal"
                placeholder="Código Postal (ex: 1000-001)"
                value={formatCodigoPostal(form.codigoPostal)}
                onChange={(e) => {
                  const formatted = formatCodigoPostal(e.target.value)
                  setForm({ ...form, codigoPostal: formatted })
                  setTouched({ ...touched, codigoPostal: true })
                }}
                required
                maxLength={8}
                className={touched.codigoPostal && errors.codigoPostal ? "error" : ""}
              />
              {touched.codigoPostal && errors.codigoPostal && <span className="error-message">{errors.codigoPostal}</span>}
            </div>

            <div className="checkout-form-group">
              <input
                name="telefone"
                placeholder="Telemóvel (9xxxxxxxx)"
                value={formatTelefone(form.telefone)}
                onChange={(e) => {
                  const formatted = formatTelefone(e.target.value)
                  setForm({ ...form, telefone: formatted })
                  setTouched({ ...touched, telefone: true })
                }}
                required
                maxLength={9}
                className={touched.telefone && errors.telefone ? "error" : ""}
              />
              {touched.telefone && errors.telefone && <span className="error-message">{errors.telefone}</span>}
            </div>

            <div className="checkout-actions">
              <button type="button" className="checkout-btn secondary" onClick={() => navigate("/carrinho")}>
                Voltar ao Carrinho
              </button>
              <button type="submit" className="checkout-btn">
                Continuar para Pagamento
              </button>
            </div>
          </form>
        </div>

        {/* Coluna direita – Resumo do Carrinho */}
        <div className="checkout-resumo">
          <h3>Resumo da Encomenda ({itens.length} itens)</h3>
          <div className="resumo-itens">
            {itens.map((item) => (
              <div key={item.id} className="resumo-item">
                <div className="resumo-item-info">
                  <img src={item.imagens[0]} alt={item.nome} className="resumo-img" />
                  <div>
                    <p className="resumo-nome">{item.nome}</p>
                    <p className="resumo-quantidade">Qty: {item.quantidade}</p>
                  </div>
                </div>
                <p className="resumo-preco">€{(item.preco * item.quantidade).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="resumo-total">
            <span>Total</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutEntrega;