import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/index.css"

// Páginas e Layout principal
import Layout from "./Layout"
import Home from "./pages/Home"
import Produtos from "./pages/Produtos"
import ProdutoDetalhes from "./pages/ProdutoDetalhes"
import Pesquisa from "./pages/Pesquisa"
import Carrinho from "./pages/Carrinho"
import Contacto from "./pages/Contacto"
import Sobre from "./pages/Sobre"
import FAQ from "./pages/FAQ"
import Privacidade from "./pages/Privacidade"
import Termos from "./pages/Termos"
import CheckoutLogin from "./pages/CheckoutLogin"
import CheckoutEntrega from "./pages/CheckoutEntrega"
import CheckoutPagamento from "./pages/CheckoutPagamento"
import CheckoutSucesso from "./pages/CheckoutSucesso"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Favoritos from "./pages/Favoritos"
import Perfil from "./pages/Perfil"
import Legal from "./pages/Legal"
import GuiaDeCompra from "./pages/GuiaDeCompra"
import GuiaDeTamanhos from "./pages/GuiaDeTamanhos"

// Providers globais (estado global da app)
import { CarrinhoProvider } from "./context/CarrinhoContext"
import { AuthProvider } from "./context/AuthContext"
import { FavoritosProvider } from "./context/FavoritosContext"
import { ToastProvider } from "./context/ToastContext"

// Render principal da aplicação
createRoot(document.getElementById("root")!).render(
  // BrowserRouter controla toda a navegação da app
  <BrowserRouter>

    {/* Provider de autenticação (user logado, dados do perfil, etc.) */}
    <AuthProvider>

      {/* Provider do carrinho (produtos, quantidades, total, etc.) */}
      <CarrinhoProvider>

        {/* Provider dos toasts (notificações rápidas) */}
        <ToastProvider>

          {/* Provider dos favoritos (lista de produtos guardados) */}
          <FavoritosProvider>

            {/* Sistema de rotas da aplicação */}
            <Routes>

              {/* Layout principal - header, footer e Outlet */}
              <Route path="/" element={<Layout />}>

                {/* Página inicial */}
                <Route index element={<Home />} />

                {/* Listagem de produtos */}
                <Route path="produtos" element={<Produtos />} />

                {/* Página de detalhes de um produto */}
                <Route path="produto/:id" element={<ProdutoDetalhes />} />

                {/* Resultados de pesquisa */}
                <Route path="pesquisa/:termo" element={<Pesquisa />} />

                {/* Carrinho */}
                <Route path="carrinho" element={<Carrinho />} />

                {/* Favoritos */}
                <Route path="favoritos" element={<Favoritos />} />

                {/* Páginas institucionais */}
                <Route path="contacto" element={<Contacto />} />
                <Route path="sobre" element={<Sobre />} />
                <Route path="legal" element={<Legal />} />
                <Route path="guia-de-compra" element={<GuiaDeCompra />} />
                <Route path="guia-de-tamanhos" element={<GuiaDeTamanhos />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="privacidade" element={<Privacidade />} />
                <Route path="termos" element={<Termos />} />

                {/* Perfil e autenticação */}
                <Route path="perfil" element={<Perfil />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />

                {/* Fluxo de checkout */}
                <Route path="checkout">
                  {/* Página inicial do checkout (login obrigatório) */}
                  <Route index element={<CheckoutLogin />} />

                  {/* Login dentro do checkout */}
                  <Route path="login" element={<CheckoutLogin />} />

                  {/* Morada de entrega */}
                  <Route path="entrega" element={<CheckoutEntrega />} />

                  {/* Pagamento */}
                  <Route path="pagamento" element={<CheckoutPagamento />} />

                  {/* Sucesso da compra */}
                  <Route path="sucesso" element={<CheckoutSucesso />} />
                </Route>

              </Route>
            </Routes>

          </FavoritosProvider>
        </ToastProvider>
      </CarrinhoProvider>
    </AuthProvider>
  </BrowserRouter>
)