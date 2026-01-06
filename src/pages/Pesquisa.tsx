import { useParams, Link } from "react-router-dom"
import { produtos } from "../data/produtos"

function Pesquisa() {
  const { termo } = useParams<{ termo: string }>()
  const termoLower = termo ? termo.toLowerCase() : ""

  const resultados = produtos.filter(
    (p) =>
      p.jogador?.toLowerCase().includes(termoLower) ||
      p.equipa?.toLowerCase().includes(termoLower) ||
      p.nome.toLowerCase().includes(termoLower)
  )

  return (
    <div className="pesquisa-page mt-20 mb-20">
      <h1 className="pesquisa-title text-center mb-10">
        Resultados para: <span className="pesquisa-term text-gold">"{termo}"</span>
      </h1>

      <p className="pesquisa-count text-center text-xl mb-20">
        Encontrados {resultados.length} {
          resultados.length !== 1 ? "produtos" : "produto"
        }
      </p>

      {resultados.length === 0 ? (
        <div className="pesquisa-empty text-center mt-20">
          <p className="pesquisa-empty-text text-2xl mb-10">Nenhum produto encontrado.</p>
          <p className="pesquisa-suggestions">Sugestões: Jordan, Kobe, Lakers, Bulls, Iverson...</p>
        </div>
      ) : (
        <div className="pesquisa-grid card-grid">
          {resultados.map(p => (
            <Link to={`/produto/${p.id}`} key={p.id} className="pesquisa-card-link">
              <div className="pesquisa-card card">
                <img src={p.imagens[0]} alt={p.nome} className="pesquisa-card-img card-img" />
                <div className="pesquisa-card-body card-body">
                  <h3 className="pesquisa-card-title card-title">{p.jogador}</h3>
                  <p className="pesquisa-card-text card-text">{p.equipa}</p>
                  <p className="pesquisa-card-price card-price">€{p.preco.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Pesquisa;