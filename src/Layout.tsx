import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <img src="/img/Logo-HOOP2-transparente.png" alt="HOOP Store" className="logo h-24" />
          </Link>
          <div className="search-form flex items-center">
            <input type="text" placeholder="Pesquisar..." className="search-input" />
            <button className="search-btn"><i className="fas fa-search"></i></button>
          </div>
          <Link to="/carrinho" className="cart-icon">
            <i className="fas fa-shopping-cart text-2xl"></i>
          </Link>
        </div>
      </header>

      {/* Nav */}
      <nav className="nav">
        <div className="container">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/produtos" className="nav-link">Produtos</Link></li>
            <li><Link to="/contacto" className="nav-link">Contacto</Link></li>
            <li><Link to="/sobre" className="nav-link">Sobre</Link></li>
          </ul>

          {/* Input de pesquisa */}
          <form action="/pesquisa" className="search-form">
            <input 
              type="text" 
              name="termo" 
              placeholder="Pesquisar jogador ou equipa..." 
              className="search-input"
              required 
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
        </div>
      </nav>

      {/* Main */}
      <main className="main flex-1">
        <div className="container">
          <Outlet />
        </div>
      </main>

      {/* Footer completo */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <div className="footer-column">
              <h4>LOJA</h4>
              <ul>
                <li><a href="/produtos">Produtos</a></li>
                <li><a href="/pesquisa">Pesquisa</a></li>
                <li><a href="/sobre">Sobre</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>APOIO</h4>
              <ul>
                <li><a href="/contacto">Contacto</a></li>
                <li><a href="#">Envios</a></li>
                <li><a href="#">Devoluções</a></li>
                <li><a href="#">Tamanhos</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>SEGUIR</h4>
              <div className="social-icons">
                <div className="social-icon">F</div>
                <div className="social-icon">I</div>
                <div className="social-icon">T</div>
              </div>
            </div>
          </div>
          <p className="text-gold text-center mt-20">© 2025 HOOP Store</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;