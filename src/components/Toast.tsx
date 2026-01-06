import { useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "info" | "error"
  onClose: () => void
}

// Componente simples para mostrar notificações rápidas no ecrã
// A ideia é aparecer, ficar uns segundos e desaparecer sozinho
// Uso isto para feedback rápido quando o utilizador faz alguma ação (ex: adicionar ao carrinho)
export default function Toast({ message, type, onClose }: ToastProps) {

  // Quando o toast aparece, começo logo um timer para o fechar automaticamente
  // O useEffect garante que o timer é limpo se o componente for desmontado antes do tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    // A classe muda conforme o tipo de toast, para aplicar cores diferentes
    <div className={`toast toast-${type}`}>
      <span>{message}</span>

      {/* Botão para fechar o toast manualmente */}
      <button onClick={onClose} className="toast-close">x</button>
    </div>
  )
}