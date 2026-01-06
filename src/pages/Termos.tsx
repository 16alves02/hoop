import "../styles/Termos.css"

function Termos() {
  return (
    // Mantém transparência e esclarece que tudo é académico e não comercial
    <div className="termos-page">
      <h1 className="termos-titulo">Termos e Condições</h1>

      {/* 1. ÂMBITO */}
      <section className="termos-section">
        <h2>1. Âmbito</h2>
        <p>
          Estes Termos e Condições regulam a utilização do website HOOP, uma plataforma
          fictícia desenvolvida exclusivamente para fins académicos e dedicada à simulação
          de um catálogo de produtos de basquetebol.
        </p>
      </section>

      {/* 2. NATUREZA DO WEBSITE */}
      <section className="termos-section">
        <h2>2. Natureza do Website</h2>
        <p>
          A HOOP não é uma loja real. Todos os produtos, preços, marcas e funcionalidades
          apresentados têm caráter demonstrativo e não representam transações comerciais
          verdadeiras nem qualquer relação comercial com marcas oficiais.
        </p>
      </section>

      {/* 3. PRODUTOS E CONTEÚDOS */}
      <section className="termos-section">
        <h2>3. Produtos e Conteúdos</h2>
        <p>
          As descrições, imagens, valores e restantes conteúdos exibidos no website têm
          como objetivo simular uma experiência de e-commerce focada no basquetebol.
          Nenhuma informação deve ser interpretada como oferta comercial real.
        </p>
      </section>

      {/* 4. CARRINHO DE COMPRAS */}
      <section className="termos-section">
        <h2>4. Carrinho de Compras</h2>
        <p>
          O carrinho de compras funciona através do <strong>localStorage</strong>, sendo
          armazenado apenas no dispositivo do utilizador. Nenhum dado é enviado ou
          processado em servidores externos.
        </p>
      </section>

      {/* 5. RESPONSABILIDADE */}
      <section className="termos-section">
        <h2>5. Responsabilidade</h2>
        <p>
          A HOOP não se responsabiliza por interpretações incorretas do conteúdo apresentado
          nem por qualquer utilização indevida da plataforma, uma vez que se trata de um
          projeto académico sem fins comerciais.
        </p>
      </section>

      {/* 6. PROPRIEDADE INTELECTUAL */}
      <section className="termos-section">
        <h2>6. Propriedade Intelectual</h2>
        <p>
          Todos os elementos visuais e textuais presentes neste website são utilizados
          exclusivamente para fins educativos. Marcas, logótipos e nomes referidos
          pertencem aos seus respetivos proprietários.
        </p>
      </section>

      {/* 7. ALTERAÇÕES */}
      <section className="termos-section">
        <h2>7. Alterações</h2>
        <p>
          A HOOP reserva-se o direito de atualizar estes Termos e Condições a qualquer
          momento, sempre com o objetivo de melhorar o projeto e a experiência de navegação.
        </p>
      </section>
    </div>
  )
}

export default Termos;