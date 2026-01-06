import "../styles/Privacidade.css"

function Privacidade() {
  return (
    <div className="privacidade-page">
      <h1 className="privacidade-titulo">Política de Privacidade</h1>

      <section className="privacidade-section">
        <h2>1. Sobre a HOOP</h2>
        <p>
          A HOOP é uma plataforma fictícia desenvolvida para fins académicos,
          dedicada exclusivamente ao basquetebol. Este website não representa
          uma loja real nem realiza transações comerciais verdadeiras.
        </p>
      </section>

      <section className="privacidade-section">
        <h2>2. Dados Recolhidos</h2>
        <p>
          A HOOP não recolhe dados pessoais sensíveis. As únicas informações
          utilizadas dizem respeito a ações realizadas no site, como produtos
          adicionados ao carrinho, que são guardados localmente no navegador
          através do <strong>localStorage</strong>.
        </p>
      </section>

      <section className="privacidade-section">
        <h2>3. Utilização do localStorage</h2>
        <p>
          O localStorage é utilizado exclusivamente para simular funcionalidades
          como o carrinho de compras. Estes dados permanecem apenas no
          dispositivo do utilizador e podem ser apagados a qualquer momento
          através das definições do navegador.
        </p>
      </section>

      <section className="privacidade-section">
        <h2>4. Cookies</h2>
        <p>
          Este website não utiliza cookies de rastreamento, publicidade ou
          análise de terceiros.
        </p>
      </section>

      <section className="privacidade-section">
        <h2>5. Segurança</h2>
        <p>
          Apesar de se tratar de um projeto académico, a HOOP segue boas práticas
          de desenvolvimento para garantir uma navegação segura e estável.
        </p>
      </section>

      <section className="privacidade-section">
        <h2>6. Alterações a esta Política</h2>
        <p>
          Esta Política de Privacidade pode ser alterada a qualquer momento para
          fins de melhoria do projeto, sem aviso prévio.
        </p>
      </section>
    </div>
  )
}

export default Privacidade;