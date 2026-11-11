export interface CheckoutDelivery {
  nome: string
  email: string
  morada: string
  cidade: string
  codigoPostal: string
  telefone: string
}

export interface CheckoutSuccessState {
  totalPago: number
  entrega: CheckoutDelivery
}

export function isCheckoutDelivery(value: unknown): value is CheckoutDelivery {
  if (typeof value !== "object" || value === null) return false

  const delivery = value as Record<string, unknown>
  return ["nome", "email", "morada", "cidade", "codigoPostal", "telefone"]
    .every((key) => typeof delivery[key] === "string" && delivery[key].trim().length > 0)
}

export function isCheckoutSuccessState(value: unknown): value is CheckoutSuccessState {
  if (typeof value !== "object" || value === null) return false

  const state = value as Record<string, unknown>
  return typeof state.totalPago === "number"
    && Number.isFinite(state.totalPago)
    && state.totalPago >= 0
    && isCheckoutDelivery(state.entrega)
}
