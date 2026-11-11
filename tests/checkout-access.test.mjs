import test from "node:test"
import assert from "node:assert/strict"
import {
  getOrderHistoryStorageKey,
  isCheckoutDelivery,
  isCheckoutSuccessState,
} from "../src/context/checkoutAccess.ts"

const entrega = {
  nome: "Pessoa de Teste",
  email: "teste@example.com",
  morada: "Rua de Teste, 10",
  cidade: "Coimbra",
  codigoPostal: "3000-000",
  telefone: "912345678",
}

test("aceita dados de entrega completos", () => {
  assert.equal(isCheckoutDelivery(entrega), true)
})

test("rejeita dados de entrega ausentes ou incompletos", () => {
  assert.equal(isCheckoutDelivery(null), false)
  assert.equal(isCheckoutDelivery(undefined), false)
  assert.equal(isCheckoutDelivery({ ...entrega, morada: " " }), false)
  assert.equal(isCheckoutDelivery({ ...entrega, telefone: 123456789 }), false)
})

test("aceita apenas estado de sucesso com total finito e entrega completa", () => {
  assert.equal(isCheckoutSuccessState({ totalPago: 42.5, entrega }), true)
  assert.equal(isCheckoutSuccessState({ totalPago: 0, entrega }), true)
})

test("rejeita acesso direto, totais inválidos e dados de entrega incompletos", () => {
  assert.equal(isCheckoutSuccessState(null), false)
  assert.equal(isCheckoutSuccessState({ totalPago: 42.5 }), false)
  assert.equal(isCheckoutSuccessState({ totalPago: Number.NaN, entrega }), false)
  assert.equal(isCheckoutSuccessState({ totalPago: Infinity, entrega }), false)
  assert.equal(isCheckoutSuccessState({ totalPago: -1, entrega }), false)
  assert.equal(isCheckoutSuccessState({ totalPago: 42.5, entrega: {} }), false)
})

test("isola o histórico por conta e normaliza o email", () => {
  assert.equal(
    getOrderHistoryStorageKey(" Pessoa@Example.com "),
    "hoop_encomendas:pessoa@example.com",
  )
  assert.notEqual(
    getOrderHistoryStorageKey("pessoa-a@example.com"),
    getOrderHistoryStorageKey("pessoa-b@example.com"),
  )
})
