import { useParams, Link } from "react-router-dom"
import { produtos } from "../data/produtos"

function Pesquisa() {
  // Puxo o termo da pesquisa diretamente da URL
  // Ex: /pesquisa/Jordan -> termo = "Jordan"
  const { termo } = useParams<{ termo: string }>()

  // Normalizo o termo para facilitar a comparação
  const termoLower = termo ? termo.toLowerCase() : ""

  // Filtro dos produtos - procura por jogador, equipa ou nome do produto
  const resultados = produtos.filter(
    (p) =>
      p.jogador?.toLowerCase().includes(termoLower) ||
      p.equipa?.toLowerCase().includes(termoLower) ||
      p.nome.toLowerCase().includes(termoLower)
  )

  return (
    <div className="pesquisa-page mt-20 mb-20">
      {/* Título com o termo pesquisado */}
      <h1 className="pesquisa-title text-center mb-10">
        Resultados para:{" "}
        <span className="pesquisa-term text-gold">"{termo}"</span>
      </h1>

      {/* Contador de resultados */}
      <p className="pesquisa-count text-center text-xl mb-20">
        {resultados.length !== 1 ? "Encontrados" : "Encontrado"} {resultados.length}{" "}
        {resultados.length !== 1 ? "produtos" : "produto"}
      </p>

      {/* Caso não haja resultados */}
      {resultados.length === 0 ? (
        <div className="pesquisa-empty text-center mt-20">
          <p className="pesquisa-empty-text text-2xl mb-10">
            Nenhum produto encontrado
          </p>
          <p className="pesquisa-suggestions">
            Sugestões: Jordan, Kobe, Lakers, Bulls, Iverson...
          </p>
        </div>
      ) : (
        // Caso haja resultados, mostro-os numa grelha igual à página de produtos
        <div className="pesquisa-grid card-grid">
          {resultados.map((p) => (
            <Link
              to={`/produto/${p.id}`}
              key={p.id}
              className="pesquisa-card-link"
            >
              <div className="pesquisa-card card">
                <img
                  src={p.imagens[0]}
                  alt={p.nome}
                  className="pesquisa-card-img card-img"
                />

                <div className="pesquisa-card-body card-body">
                  <h3 className="pesquisa-card-title card-title">
                    {p.jogador}
                  </h3>
                  <p className="pesquisa-card-text card-text">{p.equipa}</p>
                  <p className="pesquisa-card-price card-price">
                    €{p.preco.toFixed(2)}
                  </p>
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