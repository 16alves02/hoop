import { createContext, useState, type ReactNode } from "react"
import Toast from "../components/Toast"

interface ToastMessage {
  id: number
  message: string
  type: "success" | "info" | "error"
}

interface ToastContextType {
  addToast: (message: string, type?: "success" | "info" | "error") => void
}

// Contexto base dos toasts, deixo a função vazia só para garantir tipagem
export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
})

// Variável simples para gerar IDs únicos para cada toast
let toastId = 0

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  // Estado onde guardo todos os toasts ativos
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  // Função para criar um novo toast
  // Cada toast recebe um id único, a mensagem e o tipo
  const addToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = toastId++
    setToasts(prev => [...prev, { id, message, type }])
  }

  // Função para remover um toast pelo id
  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Container onde os toasts aparecem no ecrã */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}