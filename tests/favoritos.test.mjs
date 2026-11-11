import test from "node:test"
import assert from "node:assert/strict"
import {
  adicionarAosFavoritos,
  removerDosFavoritos,
  validarFavoritosGuardados,
} from "../src/context/favoritosLogic.ts"

const produto = { id: 3, nome: "Bola", preco: 25, tipo: "acessório", categoria: "bolas", imagens: ["/ball.webp"], descricao: "Teste" }

test("adiciona um favorito sem duplicar IDs", () => {
  const inicial = adicionarAosFavoritos([], produto)
  assert.equal(adicionarAosFavoritos(inicial, produto).length, 1)
})

test("remove apenas o favorito pedido", () => {
  const outro = { ...produto, id: 4 }
  assert.deepEqual(removerDosFavoritos([produto, outro], 3), [outro])
})

test("valida dados recuperados do armazenamento", () => {
  assert.deepEqual(validarFavoritosGuardados([produto, null, { id: "x" }]), [produto])
})
