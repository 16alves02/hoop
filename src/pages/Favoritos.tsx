// src/pages/Favoritos.tsx
import { useContext } from "react"
import { Link } from "react-router-dom"
import { FavoritosContext } from "../context/FavoritosContext"
import ProdutoCard from "../components/ProdutoCard"
import "../styles/Produtos.css"

function Favoritos() {
  const { favoritos, quantidadeFavoritos } = useContext(FavoritosContext)

  if (quantidadeFavoritos === 0) {
    return (
      <div className="carrinho-page" style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <h1 className="carrinho-titulo">Os teus Favoritos</h1>
        <div className="carrinho-vazio">
          <h2>A tua lista de favoritos está vazia</h2>
          <p>Explora os produtos e adiciona os teus favoritos com o ❤️</p>
          <Link to="/produtos" className="carrinho-vazio-btn">
            Ver Produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="produtos-page">
      <h1 className="produtos-titulo">Os teus Favoritos ({quantidadeFavoritos})</h1>

      <div className="produtos-grid card-grid">
        {favoritos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  )
}

export default Favoritos;