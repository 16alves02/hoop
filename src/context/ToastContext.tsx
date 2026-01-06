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

export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
})

let toastId = 0

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = toastId++
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
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