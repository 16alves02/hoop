import "../styles/GuiaDeCompra.css"

function GuiaDeCompra() {
  return (
    // Página simples de texto, usada para explicar ao utilizador como funciona a compra na HOOP
    // Mantém a mesma estrutura visual das restantes páginas informativas
    <section className="guia-page">
      <h1 className="guia-titulo">Guia de Compra</h1>

      <div className="guia-conteudo">

        {/* Explicação básica do fluxo de compra */}
        <p className="guia-texto">
          Comprar na HOOP é simples e rápido. Basta navegar pelo catálogo,
          escolher os teus produtos favoritos e adicioná-los ao carrinho
        </p>

        {/* Informação sobre filtros e navegação */}
        <p className="guia-texto">
          Podes filtrar por jogador, equipa, tamanho, cor ou preço para
          encontrares exatamente o que procuras
        </p>

        {/* Nota importante sobre o caráter fictício da loja */}
        <p className="guia-texto">
          Quando estiveres pronto, clica em “Finalizar Compra” e segue os
          passos simulados até à entrega. Lembra-te: esta é uma experiência
          fictícia, sem transações reais
        </p>
      </div>
    </section>
  )
}

export default GuiaDeCompra;