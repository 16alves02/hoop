function Home() {
  return (
    <div className="hero" style={{backgroundImage: "url(/img/kobe-background.jpg)"}}>
      <div className="hero-overlay">
        <div className="container">
          <h1 className="text-6xl font-bold text-white mb-10">HOOP STORE</h1>
          <p className="text-2xl text-white mb-10">
            A tua loja de produtos de basquetebol. Camisolas autênticas NBA, acessórios, bolas e mais. Garante qualidade para o teu jogo ou coleção.
          </p>
          <a href="/produtos" className="btn-primary"><i className="fas fa-basketball-ball"></i> Ver Produtos</a>
        </div>
      </div>
    </div>
  );
}

export default Home;