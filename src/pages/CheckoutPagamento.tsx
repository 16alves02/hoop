/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { FaPaypal, FaApplePay, FaGooglePay, FaUser, FaCreditCard } from "react-icons/fa6"
import { FaMobileAlt, FaHome, FaCheckCircle } from "react-icons/fa"
import { MdAtm } from "react-icons/md"
import "../styles/Checkout.css"

function CheckoutPagamento() {
  const navigate = useNavigate()

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
  const [cardBrand, setCardBrand] = useState<"visa" | "mastercard" | "amex" | null>(null)

  // Erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Referência MB gerada quando o utilizador escolhe multibanco
  const [referenciaMB, setReferenciaMB] = useState<string | null>(null)

  if (!carrinho) return null

  const { itens, limparCarrinho } = carrinho

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

  // Algoritmo de Luhn para validar cartões
  const luhnCheck = (number: string): boolean => {
    const digits = number.replace(/\D/g, "").split("").map(Number)
    if (digits.length < 13) return false

    let sum = 0
    let isEven = false

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i]

      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  }

  // Sempre que o número muda, tento detetar a bandeira
  useEffect(() => {
    setCardBrand(detectBrand(cardNumber))
  }, [cardNumber])

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
    } else if (!luhnCheck(cleanedNumber)) {
      newErrors.card = "Número de cartão inválido"
    }

    const [monthStr, yearStr] = expiry.split("/")
    if (!monthStr || !yearStr) {
      newErrors.expiry = "Data inválida"
    } else {
      const month = parseInt(monthStr, 10)
      const year = parseInt(`20${yearStr}`, 10)

      if (month < 1 || month > 12) {
        newErrors.expiry = "Mês inválido"
      } else {
        const expiryDate = new Date(year, month - 1)
        if (expiryDate < new Date()) {
          newErrors.expiry = "Cartão expirado"
        }
      }
    }

    const requiredCvv = cardBrand === "amex" ? 4 : 3
    if (cvv.length !== requiredCvv) {
      newErrors.cvv = `CVV deve ter ${requiredCvv} dígitos`
    }

    return newErrors
  }

  // Validação MBWay
  const validateMBWay = (): Record<string, string> => {
    if (!/^9\d{8}$/.test(telemovel)) {
      return { telemovel: "Telemóvel inválido (deve começar por 9 e ter 9 dígitos)" }
    }
    return {}
  }

  // Gera referência Multibanco fake
  const generateReferenciaMultibanco = () => {
    const entidade = "12345"
    const referencia = Math.floor(100000000 + Math.random() * 900000000)
    const valor = total.toFixed(2)
    return `Entidade: ${entidade} | Referência: ${referencia} | Valor: €${valor}`
  }

  // Finalizar pagamento
  const handleFinalizar = () => {
    setErrors({})
    setReferenciaMB(null)

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

    // Multibanco gera referência e espera 6s antes de avançar
    if (metodo === "multibanco") {
      setReferenciaMB(generateReferenciaMultibanco())
      setTimeout(() => {
        limparCarrinho()
        navigate("/checkout/sucesso")
      }, 6000)
      return
    }

    // Outros métodos avançam direto
    limparCarrinho()
    navigate("/checkout/sucesso")
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
          <h2>Método de Pagamento</h2>

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

          {/* Multibanco */}
          {metodo === "multibanco" && referenciaMB && (
            <div className="multibanco-referencia">
              <h3>Referência Multibanco</h3>
              <p>{referenciaMB}</p>
              <small>Paga até 48h em qualquer Multibanco ou homebanking</small>
            </div>
          )}

          {/* Métodos externos */}
          {["paypal", "apple", "google"].includes(metodo || "") && (
            <p className="redirect-info">
              Serás redirecionado para <strong>{metodo?.toUpperCase()}</strong> para concluir o pagamento
            </p>
          )}

          {/* Botão final */}
          <button className="checkout-btn large" onClick={handleFinalizar}>
            {metodo === "multibanco" && !referenciaMB
              ? "Gerar Referência e Pagar"
              : "Confirmar Pagamento"}
          </button>
        </div>

        {/* Coluna direita - resumo */}
        <div className="checkout-resumo">
          <h3>Resumo da Encomenda ({itens.length} itens)</h3>

          <div className="resumo-itens">
            {itens.map(item => (
              <div key={item.id} className="resumo-item">
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
            <span>Total a pagar</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPagamento;