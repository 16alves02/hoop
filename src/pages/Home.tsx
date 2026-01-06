import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "../styles/Home.css"
import { produtos } from "../data/produtos"

function Home() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Record<number, string>>({})

  const heroSlides = [
    {
      titulo: "Camisolas Icónicas da NBA",
      subtitulo: "Revive as lendas do basquetebol com autenticidade",
      cta: "Ver Camisolas",
      link: "/produtos?tipo=camisola",
      imagem: "/img/hero-camisolas.avif"
    },
    {
      titulo: "Sapatilhas de Performance",
      subtitulo: "Mamba mentality, Jordan legacy e mais",
      cta: "Explorar Sapatilhas",
      link: "/produtos?tipo=sapatilha",
      imagem: "/img/hero-sapatilhas.avif"
    },
    {
      titulo: "Coleção Exclusiva HOOP",
      subtitulo: "Qualidade premium para jogadores e colecionadores",
      cta: "Ver Todos os Produtos",
      link: "/produtos",
      imagem: "/img/hero-geral.avif"
    }
  ]

  // Slider automático
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  // Pré-carrega imagens e aplica fallback se não existirem
  useEffect(() => {
    const fallback = "/img/Logo-HOOP.png"
    const loaders = heroSlides.map((slide, idx) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = slide.imagem
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [idx]: slide.imagem }))
          resolve()
        }
        img.onerror = () => {
          // Se falhar, usamos o logo como fallback
          setLoadedImages((prev) => ({ ...prev, [idx]: fallback }))
          resolve()
        }
      })
    })

    void Promise.all(loaders)
  }, [])

  // Produtos em destaque (os mais caros/icónicos)
  const destaqueProdutos = [...produtos]
    .sort((a, b) => b.preco - a.preco)
    .slice(0, 6)

  return (
    <div className="home-page">
      {/* ================= Hero Slider ================= */}
      <section className="home-hero">
        {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`home-hero-slide ${index === heroIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${loadedImages[index] ?? slide.imagem})` }}
            >
            <div className="home-hero-overlay">
              <div className="home-container">
                <h1 className="home-titulo">{slide.titulo}</h1>
                <p className="home-subtitulo">{slide.subtitulo}</p>
                <Link to={slide.link} className="home-btn">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Indicadores do slider */}
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === heroIndex ? "active" : ""}`}
              onClick={() => setHeroIndex(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ================= Produtos em Destaque ================= */}
      <section className="home-destaques">
        <div className="home-container">
          <h2 className="destaques-titulo">Produtos em Destaque</h2>
          <div className="destaques-grid">
            {destaqueProdutos.map((produto) => (
              <Link to={`/produto/${produto.id}`} key={produto.id} className="destaque-card">
                <img src={produto.imagens[0]} alt={produto.nome} className="destaque-img" />
                <div className="destaque-info">
                  <h3>{produto.jogador || produto.nome}</h3>
                  {produto.equipa && <p>{produto.equipa}</p>}
                  <p className="destaque-preco">€{produto.preco.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="destaques-cta">
            <Link to="/produtos" className="home-btn secondary">
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Banner Promocional (inspirado em Mitchell & Ness) ================= */}
      <section className="home-promo">
        <div className="home-container">
          <h2>Coleção Exclusiva 2025</h2>
          <p>Camisolas vintage, edições limitadas e o melhor do basquetebol.</p>
          <Link to="/produtos" className="home-btn">
            Comprar Agora
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home;