import test from "node:test"
import assert from "node:assert/strict"
import {
  validarNumeroCartaoLuhn,
  validarValidadeCartao,
  validarTelemovelPortugues,
} from "../src/context/checkoutValidation.ts"

test("valida números de cartão pelo algoritmo de Luhn", () => {
  assert.equal(validarNumeroCartaoLuhn("4111 1111 1111 1111"), true)
  assert.equal(validarNumeroCartaoLuhn("4111 1111 1111 1112"), false)
  assert.equal(validarNumeroCartaoLuhn("123"), false)
  assert.equal(validarNumeroCartaoLuhn("41111111111111111111"), false)
})

test("considera válido todo o mês de expiração, incluindo o mês atual", () => {
  const now = new Date(2026, 10, 11)
  assert.equal(validarValidadeCartao("11/26", now), true)
  assert.equal(validarValidadeCartao("12/26", now), true)
  assert.equal(validarValidadeCartao("10/26", now), false)
  assert.equal(validarValidadeCartao("01/27", now), true)
})

test("rejeita formatos e meses de validade inválidos", () => {
  const now = new Date(2026, 10, 11)
  assert.equal(validarValidadeCartao("00/27", now), false)
  assert.equal(validarValidadeCartao("13/27", now), false)
  assert.equal(validarValidadeCartao("1/27", now), false)
  assert.equal(validarValidadeCartao("11/2027", now), false)
})

test("valida números móveis portugueses de nove dígitos iniciados por 9", () => {
  assert.equal(validarTelemovelPortugues("912345678"), true)
  assert.equal(validarTelemovelPortugues("212345678"), false)
  assert.equal(validarTelemovelPortugues("91234567"), false)
  assert.equal(validarTelemovelPortugues("9123456789"), false)
})
