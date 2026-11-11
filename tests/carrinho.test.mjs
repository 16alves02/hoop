import test from "node:test"
import assert from "node:assert/strict"
import {
  adicionarItemCarrinho,
  atualizarQuantidadeCarrinho,
  contarItensCarrinho,
  removerItemCarrinho,
  validarCarrinhoGuardado,
} from "../src/context/carrinhoLogic.ts"

const produto = { id: 7, nome: "Sapatilhas", preco: 80, tipo: "calçado", categoria: "sapatilhas", imagens: ["/shoe.webp"], descricao: "Teste" }

test("adiciona um produto novo com quantidade um", () => {
  const result = adicionarItemCarrinho([], produto, "42")
  assert.equal(result.length, 1)
  assert.equal(result[0].quantidade, 1)
  assert.equal(result[0].tamanho, "42")
})

test("incrementa apenas o mesmo produto e tamanho", () => {
  const inicial = adicionarItemCarrinho([], produto, "42")
  const result = adicionarItemCarrinho(inicial, produto, "43")
  const final = adicionarItemCarrinho(result, produto, "42")
  assert.equal(final.length, 2)
  assert.equal(final.find(item => item.tamanho === "42").quantidade, 2)
  assert.equal(final.find(item => item.tamanho === "43").quantidade, 1)
})

test("remove apenas a variante selecionada", () => {
  const itens = [...adicionarItemCarrinho([], produto, "42"), ...adicionarItemCarrinho([], produto, "43")]
  assert.deepEqual(removerItemCarrinho(itens, 7, "42").map(item => item.tamanho), ["43"])
})

test("altera quantidade apenas na variante selecionada e rejeita valores inválidos", () => {
  const itens = [...adicionarItemCarrinho([], produto, "42"), ...adicionarItemCarrinho([], produto, "43")]
  const atualizados = atualizarQuantidadeCarrinho(itens, 7, 4, "42")
  assert.equal(atualizados.find(item => item.tamanho === "42").quantidade, 4)
  assert.equal(atualizados.find(item => item.tamanho === "43").quantidade, 1)
  assert.equal(atualizarQuantidadeCarrinho(itens, 7, 0, "42"), itens)
})

test("conta unidades, não linhas", () => {
  const itens = adicionarItemCarrinho(adicionarItemCarrinho([], produto, "42"), produto, "42")
  assert.equal(contarItensCarrinho(itens), 2)
})

test("descarta registos inválidos do armazenamento", () => {
  assert.deepEqual(validarCarrinhoGuardado([produto, { ...produto, quantidade: 2 }, null]), [{ ...produto, quantidade: 2 }])
})

