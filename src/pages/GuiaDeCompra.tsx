import "../styles/GuiaDeCompra.css"

function GuiaDeCompra() {
  return (
    <section className="guia-page">
      <h1 className="guia-titulo">Guia de Compra</h1>

      <div className="guia-conteudo">
        <p className="guia-texto">
          Comprar na HOOP é simples e rápido. Basta navegar pelo catálogo,
          escolher os teus produtos favoritos e adicioná-los ao carrinho.
        </p>

        <p className="guia-texto">
          Podes filtrar por jogador, equipa, tamanho, cor ou preço para
          encontrares exatamente o que procuras.
        </p>

        <p className="guia-texto">
          Quando estiveres pronto, clica em “Finalizar Compra” e segue os
          passos simulados até à entrega. Lembra-te: esta é uma experiência
          fictícia, sem transações reais.
        </p>
      </div>
    </section>
  )
}

export default GuiaDeCompra;