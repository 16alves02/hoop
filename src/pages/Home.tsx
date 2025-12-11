function Home() {
  return (
    <div className="hero" style={{backgroundImage: 'url(/img/kobe-background.jpg)'}}>
      <div className="hero-overlay">
        <div className="container">
          <h1 className="text-6xl font-bold text-white mb-10">HOOP STORE</h1>
          <p className="text-2xl text-white mb-10">
            A tua loja de produtos de basquetebol. Camisolas autênticas NBA, acessórios, bolas e mais. Garante qualidade para o teu jogo ou coleção.
          </p>
          <a href="/produtos" className="btn-primary"><i className="fas fa-basketball-ball"></i> Ver Produtos</a>
        </div>
      </div>

      <section className="categories">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-10">Encontra Tudo o que Precisas</h2>
          <div className="category-grid">
            <a href="/bolas" className="category-item">
              <img src="/img/bola-example.jpg" alt="Bolas" />
              <p>Bolas de Basquetebol</p>
            </a>
            <a href="/tabelas" className="category-item">
              <img src="/img/tabela-example.jpg" alt="Tabelas" />
              <p>Tabelas de Basquetebol</p>
            </a>
            <a href="/equipamento" className="category-item">
              <img src="/img/equipamento-example.jpg" alt="Equipamento" />
              <p>Equipamento de Basquetebol</p>
            </a>
            <a href="/calcado" className="category-item">
              <img src="/img/tenis-example.jpg" alt="Calçado" />
              <p>Calçado de Basquetebol</p>
            </a>
            <a href="/acessorios" className="category-item">
              <img src="/img/acessorios-example.jpg" alt="Acessórios" />
              <p>Acessórios de Basquetebol</p>
            </a>
            <a href="/nba" className="category-item">
              <img src="/img/nba-example.jpg" alt="NBA" />
              <p>NBA</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;