export function validarNumeroCartaoLuhn(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let doubleDigit = false

  for (let index = digits.length - 1; index >= 0; index--) {
    let digit = Number(digits[index])

    if (doubleDigit) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    doubleDigit = !doubleDigit
  }

  return sum % 10 === 0
}

export function validarValidadeCartao(value: string, now = new Date()): boolean {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value)
  if (!match) return false

  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  return year > currentYear || (year === currentYear && month >= currentMonth)
}

export function validarTelemovelPortugues(value: string): boolean {
  return /^9\d{8}$/.test(value)
}
