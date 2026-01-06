import "../styles/Termos.css"

function Termos() {
  return (
    <div className="termos-page">
      <h1 className="termos-titulo">Termos e Condições</h1>

      <section className="termos-section">
        <h2>1. Âmbito</h2>
        <p>
          Os presentes Termos e Condições regulam a utilização do website HOOP,
          uma plataforma fictícia desenvolvida exclusivamente para fins
          académicos, dedicada ao catálogo de produtos de basquetebol.
        </p>
      </section>

      <section className="termos-section">
        <h2>2. Natureza do Website</h2>
        <p>
          A HOOP não é uma loja real. Todos os produtos, preços, marcas e
          funcionalidades apresentadas são meramente demonstrativas e não
          representam transações comerciais verdadeiras.
        </p>
      </section>

      <section className="termos-section">
        <h2>3. Produtos e Conteúdos</h2>
        <p>
          As informações exibidas no website, incluindo descrições, imagens e
          valores, têm como objetivo simular uma experiência de e-commerce
          focada no basquetebol.
        </p>
      </section>

      <section className="termos-section">
        <h2>4. Carrinho de Compras</h2>
        <p>
          O carrinho de compras funciona através do armazenamento local
          (localStorage) no navegador do utilizador. Nenhuma informação é
          enviada para servidores externos.
        </p>
      </section>

      <section className="termos-section">
        <h2>5. Responsabilidade</h2>
        <p>
          A HOOP não se responsabiliza por qualquer utilização indevida da
          plataforma nem por interpretações incorretas do seu conteúdo, uma vez
          que se trata de um projeto académico sem fins comerciais.
        </p>
      </section>

      <section className="termos-section">
        <h2>6. Propriedade Intelectual</h2>
        <p>
          Todos os elementos visuais e textuais presentes neste website são
          utilizados apenas para fins educativos. Marcas e nomes referidos
          pertencem aos seus respetivos proprietários.
        </p>
      </section>

      <section className="termos-section">
        <h2>7. Alterações</h2>
        <p>
          A HOOP reserva-se o direito de alterar estes Termos e Condições a
          qualquer momento, sempre com o objetivo de melhorar o projeto.
        </p>
      </section>
    </div>
  )
}

export default Termos;