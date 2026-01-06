import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "./context/AuthContextValue"
import { ToastContext } from "./context/ToastContext"
import { CarrinhoContext } from "./context/CarrinhoContext"
import { FavoritosContext } from "./context/FavoritosContext"
import "./styles/Layout.css"

function Layout() {
  const navigate = useNavigate()

  // Quantidade de itens no carrinho
  const { carrinhoQtd } = useContext(CarrinhoContext)

  // Quantidade de favoritos guardados
  const { quantidadeFavoritos } = useContext(FavoritosContext)

  // Estado de autenticação (user logado ou não)
  const auth = useContext(AuthContext)

  // Toasts para feedback rápido
  const { addToast } = useContext(ToastContext)

  // Estado do menu mobile (aberto/fechado)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /* ==============
     Função de pesquisa
     Lê o termo, redireciona para /pesquisa/termo
  ============== */
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const termoInput = e.currentTarget.elements.namedItem("termo") as HTMLInputElement
    const termo = termoInput.value.trim()

    if (termo !== "") {
      navigate(`/pesquisa/${encodeURIComponent(termo)}`)
      termoInput.value = "" // Limpa o campo depois da pesquisa
    }
  }

  // Abre/fecha o menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  // Quando o utilizador clica no ícone de perfil
  const handlePerfilClick = () => {
    if (auth?.isAuthenticated && auth.user) {
      navigate("/perfil")
    } else {
      addToast("Inicia sessão para aceder à tua conta", "info")
      navigate("/login")
    }
  }

  return (
    <div className="layout">

      {/*  HEADER  */}
      <header className="header">
        <div className="header-top">
          <div className="header-container">

            {/* Logo principal */}
            <Link to="/" className="header-logo">
              <img src="/img/Logo-HOOP2.png" alt="HOOP Store" />
            </Link>

            {/* Barra de pesquisa (versão desktop) */}
            <form className="header-search-desktop" onSubmit={handleSearch}>
              <input
                type="text"
                name="termo"
                placeholder="Pesquisar jogador, equipa, produto..."
                aria-label="Pesquisar produtos"
              />
              <button type="submit" aria-label="Pesquisar">
                <i className="fas fa-search"></i>
              </button>
            </form>

            {/* Ícones do lado direito */}
            <div className="header-icons">

              {/* Pesquisa mobile (aparece só em ecrãs pequenos) */}
              <form className="header-search-mobile" onSubmit={handleSearch}>
                <input
                  type="text"
                  name="termo"
                  placeholder="Pesquisar..."
                  aria-label="Pesquisar produtos"
                />
                <button type="submit" aria-label="Pesquisar">
                  <i className="fas fa-search"></i>
                </button>
              </form>

              {/* Favoritos */}
              <Link to="/favoritos" className="header-icon">
                <i className="far fa-heart"></i>
                {quantidadeFavoritos > 0 && (
                  <span className="header-badge">{quantidadeFavoritos}</span>
                )}
              </Link>

              {/* Perfil - mostra nome se estiver autenticado */}
              {auth?.isAuthenticated && auth.user ? (
                <div className="header-user">
                  <Link to="/perfil" className="header-icon">
                    <i className="far fa-user"></i>
                  </Link>
                  <span className="header-user-name">
                    Olá, {auth.user.nome.split(" ")[0]}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handlePerfilClick}
                  className="header-icon"
                  aria-label="Iniciar sessão"
                >
                  <i className="far fa-user"></i>
                </button>
              )}

              {/* Carrinho */}
              <Link to="/carrinho" className="header-icon">
                <i className="fas fa-shopping-bag"></i>
                {carrinhoQtd > 0 && (
                  <span className="header-badge">{carrinhoQtd}</span>
                )}
              </Link>

              {/* Botão hamburger (abre menu mobile) */}
              <button
                className="header-mobile-toggle"
                onClick={toggleMobileMenu}
                aria-label="Abrir menu"
              >
                <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
              </button>
            </div>
          </div>
        </div>

        {/*  MENU DE CATEGORIAS  */}
        <nav className={`header-categories ${mobileMenuOpen ? "open" : ""}`}>
          <div className="header-container">
            <ul className="categories-list">
              <li>
                <Link to="/produtos" onClick={() => setMobileMenuOpen(false)}>
                  Coleção Completa
                </Link>
              </li>
              <li>
                <Link to="/sobre" onClick={() => setMobileMenuOpen(false)}>
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contacto" onClick={() => setMobileMenuOpen(false)}>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        {/* Outlet = onde as páginas são renderizadas */}
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-main">

            {/* Secção de navegação */}
            <div className="footer-links-group">
              <h4>Navegação</h4>
              <ul>
                <li><Link to="/">Início</Link></li>
                <li><Link to="/produtos">Produtos</Link></li>
                <li><Link to="/sobre">Sobre</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
              </ul>
            </div>

            {/* Secção institucional */}
            <div className="footer-links-group">
              <h4>Institucional</h4>
              <ul>
                <li><Link to="/faq">Ajuda / FAQ</Link></li>
                <li><Link to="/guia-de-compra">Guia de Compra</Link></li>
                <li><Link to="/guia-de-tamanhos">Guia de Tamanhos</Link></li>
                <li><Link to="/sobre">Sobre a Empresa</Link></li>
              </ul>
            </div>

            {/* Secção legal */}
            <div className="footer-links-group">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/termos">Termos e Condições</Link></li>
                <li><Link to="/privacidade">Política de Privacidade</Link></li>
                <li><Link to="/legal">Informação Legal</Link></li>
              </ul>
            </div>

            {/* Redes sociais */}
            <div className="footer-social">
              <h4>Siga-nos</h4>
              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-x-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Rodapé final */}
          <div className="footer-bottom">
            © {new Date().getFullYear()} HOOP • Desenvolvido por{" "}
            <a
              href="https://github.com/16alves02"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leonardo Alves
            </a>{" "}
            • All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout;