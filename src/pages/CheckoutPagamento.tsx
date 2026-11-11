import { useState, useContext } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { FaPaypal, FaApplePay, FaGooglePay, FaUser, FaCreditCard } from "react-icons/fa6"
import { FaMobileAlt, FaHome, FaCheckCircle } from "react-icons/fa"
import { MdAtm } from "react-icons/md"
import "../styles/Checkout.css"
import { validarNumeroCartaoLuhn, validarValidadeCartao, validarTelemovelPortugues } from "../context/checkoutValidation"
import { getOrderHistoryStorageKey, isCheckoutDelivery } from "../context/checkoutAccess"

function CheckoutPagamento() {
  const navigate = useNavigate()
  const location = useLocation()
  const entrega = (location.state as { entrega?: { nome: string; email: string; morada: string; cidade: string; codigoPostal: string; telefone: string } } | null)?.entrega

  // Puxo o carrinho para saber os itens e limpar no final
  const carrinho = useContext(CarrinhoContext)

  // Estado do método de pagamento escolhido
  const [metodo, setMetodo] = useState<string | null>(null)

  // Estados do cartão
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  // Estado MBWay
  const [telemovel, setTelemovel] = useState("")

  // Bandeira do cartão detetada automaticamente

  // Erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { itens, limparCarrinho } = carrinho

  // O pagamento só pode ser aberto depois de validar os dados de entrega.
  if (itens.length === 0) return <Navigate to="/carrinho" replace />
  if (!isCheckoutDelivery(entrega)) return <Navigate to="/checkout/entrega" replace />

  // Total da compra
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  // Deteta a bandeira do cartão pelos primeiros dígitos
  const detectBrand = (number: string): "visa" | "mastercard" | "amex" | null => {
    const cleaned = number.replace(/\s/g, "")
    if (/^4/.test(cleaned)) return "visa"
    if (/^5[1-5]/.test(cleaned)) return "mastercard"
    if (/^3[47]/.test(cleaned)) return "amex"
    return null
  }

  // A bandeira é derivada diretamente do número introduzido.
  const cardBrand = detectBrand(cardNumber)

  // Máscara do número do cartão
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const match = digits.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/)
    if (!match) return digits
    return [match[1], match[2], match[3], match[4]].filter(Boolean).join(" ")
  }

  // Máscara da validade
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }
    return digits
  }

  // Máscara MBWay
  const formatTelemovel = (value: string) => value.replace(/\D/g, "").slice(0, 9)

  // Validação do cartão
  const validateCard = (): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    const cleanedNumber = cardNumber.replace(/\s/g, "")
    if (cleanedNumber.length < 15) {
      newErrors.card = "Número de cartão incompleto"
    } else if (!validarNumeroCartaoLuhn(cleanedNumber)) {
      newErrors.card = "Número de cartão inválido"
    }

    if (!validarValidadeCartao(expiry)) {
      newErrors.expiry = "Data inválida ou cartão expirado"
    }

    const requiredCvv = cardBrand === "amex" ? 4 : 3
    if (cvv.length !== requiredCvv) {
      newErrors.cvv = `CVV deve ter ${requiredCvv} dígitos`
    }

    return newErrors
  }

  // Validação MBWay
  const validateMBWay = (): Record<string, string> => {
    if (!validarTelemovelPortugues(telemovel)) {
      return { telemovel: "Telemóvel inválido (deve começar por 9 e ter 9 dígitos)" }
    }
    return {}
  }

  // Regista a encomenda simulada antes de limpar o carrinho.
  const registarEncomenda = () => {
    if (itens.length === 0) return

    const novaEncomenda = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      data: new Date().toLocaleDateString("pt-PT"),
      total,
      itens: itens.reduce((acc, item) => acc + item.quantidade, 0),
      status: "simulada" as const,
    }

    try {
      const stored = localStorage.getItem(getOrderHistoryStorageKey(entrega.email))
      const parsed: unknown = stored ? JSON.parse(stored) : []
      const historicoAtual = Array.isArray(parsed) ? parsed : []
      localStorage.setItem(
        getOrderHistoryStorageKey(entrega.email),
        JSON.stringify([novaEncomenda, ...historicoAtual].slice(0, 10))
      )
    } catch (error) {
      console.error("Não foi possível guardar o histórico de encomendas.", error)
    }
  }

  const concluirCompra = () => {
    registarEncomenda()
    limparCarrinho()
    navigate("/checkout/sucesso", { state: { totalPago: total, entrega } })
  }

  // Finalizar pagamento
  const handleFinalizar = () => {
    setErrors({})

    if (!metodo) {
      alert("Escolhe um método de pagamento")
      return
    }

    let hasError = false

    if (metodo === "cartao") {
      const cardErrors = validateCard()
      if (Object.keys(cardErrors).length > 0) {
        setErrors(cardErrors)
        hasError = true
      }
    }

    if (metodo === "mbway") {
      const mbwayErrors = validateMBWay()
      if (Object.keys(mbwayErrors).length > 0) {
        setErrors(mbwayErrors)
        hasError = true
      }
    }

    if (hasError) return

    // Os restantes métodos simulados avançam diretamente.
    concluirCompra()
  }

  return (
    <div className="checkout-page">

      {/* Barra de progresso */}
      <div className="checkout-progress">
        <div className="checkout-step ativo"><FaUser /></div>
        <div className="checkout-step ativo"><FaHome /></div>
        <div className="checkout-step ativo"><FaCreditCard /></div>
        <div className="checkout-step"><FaCheckCircle /></div>
      </div>

      <div className="checkout-entrega-container">

        {/* Coluna esquerda */}
        <div className="checkout-form-left">
          <h2>Método de Pagamento — demonstração</h2>
          <p role="note">Projeto académico: nenhum pagamento é processado. Não introduzas dados reais de cartão ou de pagamento.</p>

          {/* Botões dos métodos */}
          <div className="checkout-pagamento-metodos">
            <button onClick={() => setMetodo("cartao")} className={metodo === "cartao" ? "ativo" : ""}>
              <FaCreditCard size={22} /> Cartão
            </button>

            <button onClick={() => setMetodo("mbway")} className={metodo === "mbway" ? "ativo" : ""}>
              <FaMobileAlt size={22} /> MB Way
            </button>

            <button onClick={() => setMetodo("multibanco")} className={metodo === "multibanco" ? "ativo" : ""}>
              <MdAtm size={22} /> Multibanco
            </button>

            <button onClick={() => setMetodo("paypal")} className={metodo === "paypal" ? "ativo" : ""}>
              <FaPaypal size={22} /> PayPal
            </button>

            <button onClick={() => setMetodo("apple")} className={metodo === "apple" ? "ativo" : ""}>
              <FaApplePay size={26} /> Apple Pay
            </button>

            <button onClick={() => setMetodo("google")} className={metodo === "google" ? "ativo" : ""}>
              <FaGooglePay size={26} /> Google Pay
            </button>
          </div>

          {/* Formulário cartão */}
          {metodo === "cartao" && (
            <div className="checkout-form-group card-form">

              <div className="card-input-wrapper">
                <input
                  placeholder="Número do Cartão"
                  value={formatCardNumber(cardNumber)}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  className={errors.card ? "error" : ""}
                />

                {cardBrand && (
                  <div className={`card-brand ${cardBrand}`}>
                    <span className="brand-text">{cardBrand.toUpperCase()}</span>
                  </div>
                )}

                {errors.card && <span className="error-message">{errors.card}</span>}
              </div>

              <div className="card-row">

                <div className="card-input-wrapper">
                  <input
                    placeholder="MM/AA"
                    value={formatExpiry(expiry)}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={5}
                    className={errors.expiry ? "error" : ""}
                  />
                  {errors.expiry && <span className="error-message">{errors.expiry}</span>}
                </div>

                <div className="card-input-wrapper">
                  <input
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    className={errors.cvv ? "error" : ""}
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>

              </div>
            </div>
          )}

          {/* MBWay */}
          {metodo === "mbway" && (
            <div className="checkout-form-group">
              <input
                placeholder="Telemóvel (9xxxxxxxx)"
                value={formatTelemovel(telemovel)}
                onChange={(e) => setTelemovel(e.target.value)}
                maxLength={9}
                className={errors.telemovel ? "error" : ""}
              />
              {errors.telemovel && <span className="error-message">{errors.telemovel}</span>}
            </div>
          )}

          {metodo === "multibanco" && (
            <p role="note">O Multibanco é apenas uma opção ilustrativa. Esta demonstração não emite referências nem recebe pagamentos.</p>
          )}

          {/* Métodos externos */}
          {["paypal", "apple", "google"].includes(metodo || "") && (
            <p className="redirect-info">
              <strong>{metodo?.toUpperCase()}</strong> é apresentado apenas para fins demonstrativos. Não existe redirecionamento nem cobrança.
            </p>
          )}

          {/* Botão final */}
          <button className="checkout-btn large" onClick={handleFinalizar}>
            Concluir simulação
          </button>
        </div>

        {/* Coluna direita - resumo */}
        <div className="checkout-resumo">
          <h3>Resumo da Encomenda ({itens.reduce((acc, item) => acc + item.quantidade, 0)} itens)</h3>

          <div className="resumo-itens">
            {itens.map(item => (
              <div key={`${item.id}-${item.tamanho ?? "sem-tamanho"}`} className="resumo-item">
                <div className="resumo-item-info">
                  <img src={item.imagens[0]} alt={item.nome} className="resumo-img" />
                  <div>
                    <p className="resumo-nome">{item.nome}</p>
                    <p className="resumo-quantidade">Quantidade: {item.quantidade}</p>
                  </div>
                </div>
                <p className="resumo-preco">
                  €{(item.preco * item.quantidade).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="resumo-total">
            <span>Total da simulação</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPagamento;