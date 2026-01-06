import "../styles/Legal.css"

function Legal() {
  return (
    <section className="legal-page">
      <h1 className="legal-titulo">Informação Legal</h1>

      <div className="legal-conteudo">
        <p className="legal-texto">
          A HOOP é um projeto académico sem fins comerciais. Todas as informações
          apresentadas neste website têm como objetivo demonstrar conceitos de
          desenvolvimento web e e-commerce.
        </p>

        <p className="legal-texto">
          Não existe qualquer relação contratual, comercial ou jurídica entre os
          utilizadores e a plataforma HOOP. Nenhum dado é recolhido para fins
          comerciais, e nenhuma transação real é efetuada.
        </p>

        <p className="legal-texto">
          As marcas, imagens e nomes utilizados pertencem aos seus respetivos
          proprietários e são usados apenas para fins educativos.
        </p>
      </div>
    </section>
  )
}

export default Legal;