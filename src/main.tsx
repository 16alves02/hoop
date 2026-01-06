import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/index.css"

// Pages e Layout
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

// Context Providers
import { CarrinhoProvider } from "./context/CarrinhoContext"
import { AuthProvider } from "./context/AuthContext"
import { FavoritosProvider } from "./context/FavoritosContext"
import { ToastProvider } from "./context/ToastContext"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <CarrinhoProvider>
        <ToastProvider>
          <FavoritosProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path="produto/:id" element={<ProdutoDetalhes />} />
                <Route path="pesquisa/:termo" element={<Pesquisa />} />
                <Route path="carrinho" element={<Carrinho />} />
                <Route path="favoritos" element={<Favoritos />} />
                <Route path="contacto" element={<Contacto />} />
                <Route path="sobre" element={<Sobre />} />
                <Route path="legal" element={<Legal />} />
                <Route path="guia-de-compra" element={<GuiaDeCompra />} />
                <Route path="guia-de-tamanhos" element={<GuiaDeTamanhos />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="privacidade" element={<Privacidade />} />
                <Route path="termos" element={<Termos />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="checkout">
                  <Route index element={<CheckoutLogin />} />
                  <Route path="login" element={<CheckoutLogin />} />
                  <Route path="entrega" element={<CheckoutEntrega />} />
                  <Route path="pagamento" element={<CheckoutPagamento />} />
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