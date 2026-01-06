import "../styles/Sobre.css"

function Sobre() {
  return (
    <section className="sobre-page">
      {/* Título principal */}
      <h1 className="sobre-titulo">Be the Best. Committed Forever.</h1>

      {/* Introdução */}
      <div className="sobre-conteudo">
        <p className="sobre-texto">
          Na HOOP promovemos a cultura do basquetebol a todos os níveis, especializando-nos
          tanto nos produtos como na experiência de quem vive o jogo.
        </p>

        <p className="sobre-texto">
          Queremos transformar a experiência de comprar basquetebol online e levá-la
          para uma nova dimensão. Estamos prontos para enfrentar qualquer desafio
          que surja no caminho.
        </p>

        {/* The Legacy */}
        <h2 className="sobre-subtitulo">The Legacy</h2>
        <p className="sobre-texto">
          Vimos de um passado cheio de inspiração e estamos a caminhar para um futuro
          cheio de energia e paixão pelo basquetebol. A HOOP nasceu da vontade de criar
          uma loja online que una cultura, produtos icónicos e experiências memoráveis.
        </p>

        <p className="sobre-texto">
          Cada produto que escolhemos representa momentos inesquecíveis, jogadores lendários
          ou eras que moldaram a cultura do basquetebol. Queremos que cada compra seja uma
          experiência que vá muito além do produto.
        </p>

        {/* The Soul */}
        <h2 className="sobre-subtitulo">The Soul</h2>
        <div className="sobre-cards">
          <div className="sobre-card">
            <h3>Arte</h3>
            <p>
              Celebramos a criatividade ligada ao basquetebol, dos designs das sapatilhas
              aos grafites e murais que inspiram a cultura urbana.
            </p>
          </div>

          <div className="sobre-card">
            <h3>Música</h3>
            <p>
              A música acompanha cada jogada, treino e momento da comunidade HOOP.
              Descobre a nossa playlist oficial abaixo.
            </p>
            {/* Spotify Embed */}
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

          <div className="sobre-card">
            <h3>Impacto Social</h3>
            <p>
              Acreditamos na inclusão e na promoção de iniciativas que levem o basquetebol
              e a cultura urbana a todos.
            </p>
          </div>
        </div>

        {/* The Hype */}
        <h2 className="sobre-subtitulo">The Hype</h2>
        <p className="sobre-texto">
          Procuramos ser reconhecidos como a plataforma que transcende as fronteiras do campo,
          fundindo a paixão pelo basquetebol com a diversidade cultural, a música e o
          envolvimento social. O nosso objetivo é inspirar emoções e criar experiências
          que conectem todos os fãs de basquetebol.
        </p>

        {/* Destaque final */}
        <div className="sobre-destaque">
          Basket. Cultura. Rua.
        </div>
      </div>
    </section>
  )
}

export default Sobre;