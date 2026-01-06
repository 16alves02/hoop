import "../styles/Sobre.css"

function Sobre() {
  return (
    <section className="sobre-page">

      {/* Título principal da página, estilo manifesto */}
      <h1 className="sobre-titulo">Be the Best. Committed Forever.</h1>

      {/* Conteúdo principal da página */}
      <div className="sobre-conteudo">

        {/* Introdução à marca */}
        <p className="sobre-texto">
          Na HOOP promovemos a cultura do basquetebol a todos os níveis, desde o streetball
          às grandes arenas. Especializamo-nos tanto nos produtos como na experiência de quem vive o jogo.
        </p>

        <p className="sobre-texto">
          Queremos transformar a forma como se compra basquetebol online e elevar essa experiência
          a um novo patamar. Estamos aqui para crescer, evoluir e enfrentar qualquer desafio.
        </p>

        {/* THE LEGACY */}
        <h2 className="sobre-subtitulo">The Legacy</h2>

        <p className="sobre-texto">
          Vimos de um passado cheio de inspiração e caminhamos para um futuro movido pela energia
          e paixão do basquetebol. A HOOP nasceu da vontade de criar uma plataforma que una cultura,
          produtos icónicos e experiências memoráveis.
        </p>

        <p className="sobre-texto">
          Cada produto representa momentos inesquecíveis, jogadores lendários e eras que moldaram
          a história do jogo. Queremos que cada compra seja mais do que um produto - seja uma memória.
        </p>

        {/* THE SOUL */}
        <h2 className="sobre-subtitulo">The Soul</h2>

        <div className="sobre-cards">

          {/* Card 1 - Arte */}
          <div className="sobre-card">
            <h3>Arte</h3>
            <p>
              Celebramos a criatividade ligada ao basquetebol - das sapatilhas icónicas aos murais
              que pintam as ruas e inspiram a cultura urbana.
            </p>
          </div>

          {/* Card 2 - Música */}
          <div className="sobre-card">
            <h3>Música</h3>
            <p>
              A música acompanha cada jogada, treino e momento da comunidade HOOP.
              Abaixo encontras a nossa playlist oficial.
            </p>

            {/* Embed do Spotify - mantém o estilo arredondado */}
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/65GFgFVbaPxe7y9hyKv9EA?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay clipboard-write encrypted-media fullscreen picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Card 3 - Impacto Social */}
          <div className="sobre-card">
            <h3>Impacto Social</h3>
            <p>
              Acreditamos na inclusão e no impacto positivo que o basquetebol pode ter.
              Queremos apoiar iniciativas que levem o jogo - e a cultura - a todos.
            </p>
          </div>
        </div>

        {/* THE HYPE */}
        <h2 className="sobre-subtitulo">The Hype</h2>

        <p className="sobre-texto">
          Procuramos ser uma plataforma que transcende o campo, fundindo basquetebol, cultura,
          música e comunidade. O nosso objetivo é inspirar emoções e criar experiências que
          conectem todos os fãs do jogo - dentro e fora das quatro linhas.
        </p>

        {/* Destaque final - frase forte, estilo assinatura */}
        <div className="sobre-destaque">
          Basket. Cultura. Rua.
        </div>
      </div>
    </section>
  )
}

export default Sobre;