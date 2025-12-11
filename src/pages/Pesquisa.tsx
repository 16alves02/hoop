import { useParams, Link } from "react-router-dom";
import { produtos } from "../data/produtos";

function Pesquisa() {
  const { termo } = useParams<{ termo: string }>();
  const termoLower = termo ? termo.toLowerCase() : "";

  const resultados = produtos.filter(p =>
    p.jogador.toLowerCase().includes(termoLower) ||
    p.equipa.toLowerCase().includes(termoLower) ||
    p.nome.toLowerCase().includes(termoLower)
  );

  return (
    <div className="mt-20 mb-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Resultados para: <span className="text-gold">"{termo}"</span>
      </h1>

      <p className="text-center text-xl mb-20">
        Encontrados {resultados.length} produto{resultados.length !== 1 ? "s" : ""}
      </p>

      {resultados.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-2xl mb-10">Nenhum produto encontrado.</p>
          <p>Sugestões: Jordan, Kobe, Lakers, Bulls, Iverson...</p>
        </div>
      ) : (
        <div className="card-grid">
          {resultados.map(p => (
            <Link to={`/produto/${p.id}`} key={p.id} className="card-link">
              <div className="card">
                <img src={p.imagens[0]} alt={p.nome} className="card-img" />
                <div className="card-body">
                  <h3 className="card-title">{p.jogador}</h3>
                  <p className="card-text">{p.equipa}</p>
                  <p className="card-price">€{p.preco.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pesquisa;