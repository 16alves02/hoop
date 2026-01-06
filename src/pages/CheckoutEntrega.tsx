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

  // Puxo o user autenticado e o carrinho
  // Se algum deles não existir, nem vale a pena renderizar a página
  const auth = useContext(AuthContext)
  const carrinho = useContext(CarrinhoContext)

  // Estado do formulário, já pré-preenchido com nome e email do user autenticado
  const [form, setForm] = useState(() => ({
    nome: auth?.user?.nome ?? "",
    email: auth?.user?.email ?? "",
    morada: "",
    cidade: "",
    codigoPostal: "",
    telefone: ""
  }))

  // Estados para erros e para saber se o utilizador já mexeu num campo
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Se não houver user ou carrinho, não mostro nada
  if (!auth?.user || !carrinho) return null

  const { itens } = carrinho
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  // Atualiza o estado do formulário e marca o campo como touched
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setTouched({ ...touched, [name]: true })

    // Se o campo tinha erro, limpo-o quando o utilizador começa a escrever
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name as keyof FormErrors]: undefined })
    }
  }

  // Validação básica dos campos
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

  // Quando o utilizador tenta avançar para pagamento
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      // Marco todos os campos como touched para mostrar os erros todos
      setTouched({
        morada: true,
        cidade: true,
        codigoPostal: true,
        telefone: true
      })
      return
    }

    // Se tudo estiver válido, avanço para a página de pagamento
    navigate("/checkout/pagamento")
  }

  // Formata automaticamente o código postal enquanto o utilizador escreve
  const formatCodigoPostal = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length >= 4) {
      return `${digits.slice(0, 4)}-${digits.slice(4, 7)}`
    }
    return digits
  }

  // Garante que o telefone só tem números e no máximo 9 dígitos
  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    return digits.slice(0, 9)
  }

  return (
    <div className="checkout-page">

      {/* Barra de progresso do checkout */}
      <div className="checkout-progress">
        <div className="checkout-step ativo"><FaUser /></div>
        <div className="checkout-step ativo"><FaHome /></div>
        <div className="checkout-step"><FaCreditCard /></div>
        <div className="checkout-step"><FaCheckCircle /></div>
      </div>

      <div className="checkout-entrega-container">

        {/* Coluna esquerda – formulário de entrega */}
        <div className="checkout-form-left">
          <h2>Dados de Entrega</h2>

          <form className="checkout-form-content" onSubmit={handleSubmit} noValidate>

            {/* Morada */}
            <div className="checkout-form-group">
              <input
                name="morada"
                placeholder="Morada completa (rua, nº, andar...)"
                value={form.morada}
                onChange={handleChange}
                required
                className={touched.morada && errors.morada ? "error" : ""}
              />
              {touched.morada && errors.morada && (
                <span className="error-message">{errors.morada}</span>
              )}
            </div>

            {/* Cidade */}
            <div className="checkout-form-group">
              <input
                name="cidade"
                placeholder="Cidade"
                value={form.cidade}
                onChange={handleChange}
                required
                className={touched.cidade && errors.cidade ? "error" : ""}
              />
              {touched.cidade && errors.cidade && (
                <span className="error-message">{errors.cidade}</span>
              )}
            </div>

            {/* Código Postal */}
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
              {touched.codigoPostal && errors.codigoPostal && (
                <span className="error-message">{errors.codigoPostal}</span>
              )}
            </div>

            {/* Telefone */}
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
              {touched.telefone && errors.telefone && (
                <span className="error-message">{errors.telefone}</span>
              )}
            </div>

            {/* Botões */}
            <div className="checkout-actions">
              <button
                type="button"
                className="checkout-btn secondary"
                onClick={() => navigate("/carrinho")}
              >
                Voltar ao Carrinho
              </button>

              <button type="submit" className="checkout-btn">
                Continuar para Pagamento
              </button>
            </div>
          </form>
        </div>

        {/* Coluna direita – resumo da encomenda */}
        <div className="checkout-resumo">
          <h3>Resumo da Encomenda ({itens.length} itens)</h3>

          <div className="resumo-itens">
            {itens.map(item => (
              <div key={item.id} className="resumo-item">
                <div className="resumo-item-info">
                  <img src={item.imagens[0]} alt={item.nome} className="resumo-img" />
                  <div>
                    <p className="resumo-nome">{item.nome}</p>
                    <p className="resumo-quantidade">Qty: {item.quantidade}</p>
                  </div>
                </div>
                <p className="resumo-preco">
                  €{(item.preco * item.quantidade).toFixed(2)}
                </p>
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