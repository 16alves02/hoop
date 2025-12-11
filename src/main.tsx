import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import Produtos from "./pages/Produtos.tsx";
import ProdutoDetalhes from "./pages/ProdutoDetalhes.tsx";
import Pesquisa from "./pages/Pesquisa.tsx";
import Contacto from "./pages/Contacto.tsx";
import Sobre from "./pages/Sobre.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="produto/:id" element={<ProdutoDetalhes />} />
        <Route path="pesquisa/:termo" element={<Pesquisa />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="sobre" element={<Sobre />} />
      </Route>
    </Routes>
  </BrowserRouter>
);