import "../styles/Privacidade.css"

function Privacidade() {
  return (
    // Serve para deixar claro que a HOOP é um projeto académico e não recolhe dados reais
    <div className="privacidade-page">
      <h1 className="privacidade-titulo">Política de Privacidade</h1>

      {/* Secção 1 - Explicação do propósito da HOOP */}
      <section className="privacidade-section">
        <h2>1. Sobre a HOOP</h2>
        <p>
          A HOOP é uma plataforma fictícia criada exclusivamente para fins académicos,
          focada no basquetebol e na simulação de uma experiência de e-commerce.
          Não representa uma loja real e não realiza qualquer tipo de transação comercial.
        </p>
      </section>

      {/* Secção 2 - Dados recolhidos (mínimos e locais) */}
      <section className="privacidade-section">
        <h2>2. Dados Recolhidos</h2>
        <p>
          A HOOP não recolhe dados pessoais sensíveis nem armazena informação em servidores.
          As únicas informações utilizadas dizem respeito às ações realizadas no site,
          como produtos adicionados ao carrinho ou favoritos, guardados apenas no teu
          navegador através do <strong>localStorage</strong>.
        </p>
      </section>

      {/* Secção 3 - Explicação do localStorage */}
      <section className="privacidade-section">
        <h2>3. Utilização do localStorage</h2>
        <p>
          O localStorage é usado apenas para simular funcionalidades como carrinho,
          favoritos e histórico de encomendas. Estes dados ficam guardados no teu
          dispositivo e podes apagá-los a qualquer momento nas definições do navegador.
        </p>
      </section>

      {/* Secção 4 - Cookies */}
      <section className="privacidade-section">
        <h2>4. Cookies</h2>
        <p>
          Este website não utiliza cookies de rastreamento, publicidade ou análise.
          Não existe qualquer recolha de dados para fins comerciais ou estatísticos.
        </p>
      </section>

      {/* Secção 5 - Segurança */}
      <section className="privacidade-section">
        <h2>5. Segurança</h2>
        <p>
          Apesar de ser um projeto académico, a HOOP segue boas práticas de desenvolvimento
          para garantir uma navegação estável e segura, sem recolha de dados sensíveis.
        </p>
      </section>

      {/* Secção 6 - Alterações futuras */}
      <section className="privacidade-section">
        <h2>6. Alterações a esta Política</h2>
        <p>
          Esta Política de Privacidade pode ser atualizada a qualquer momento para melhorar
          o projeto ou ajustar funcionalidades, sem aviso prévio.
        </p>
      </section>
    </div>
  )
}

export default Privacidade;