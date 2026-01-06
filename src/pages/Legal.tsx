import "../styles/Legal.css"

function Legal() {
  return (
    // Mantém a transparência e evita qualquer confusão sobre direitos, dados ou transações
    <section className="legal-page">
      <h1 className="legal-titulo">Informação Legal</h1>

      <div className="legal-conteudo">

        {/* Explicação sobre o propósito do projeto */}
        <p className="legal-texto">
          A HOOP é um projeto académico sem fins comerciais. Todo o conteúdo
          apresentado neste website existe apenas para demonstrar conceitos de
          desenvolvimento web, design e experiência de e-commerce.
        </p>

        {/* Esclarecimento sobre dados, pagamentos e relações contratuais */}
        <p className="legal-texto">
          Não existe qualquer relação contratual, comercial ou jurídica entre os
          utilizadores e a plataforma HOOP. Nenhum pagamento real é processado,
          nenhuma encomenda é enviada e nenhum dado é recolhido para fins comerciais.
        </p>

        {/* Nota sobre direitos de autor e marcas utilizadas */}
        <p className="legal-texto">
          Todas as marcas, logótipos, imagens e nomes apresentados pertencem aos seus
          respetivos proprietários. São utilizados exclusivamente para fins educativos
          e não representam qualquer parceria, afiliação ou autorização oficial.
        </p>

        {/* Informação adicional para reforçar transparência */}
        <p className="legal-texto">
          Este projeto não pretende substituir, replicar ou competir com qualquer loja
          oficial. O objetivo é apenas criar uma experiência realista para fins de
          aprendizagem.
        </p>
      </div>
    </section>
  )
}

export default Legal;