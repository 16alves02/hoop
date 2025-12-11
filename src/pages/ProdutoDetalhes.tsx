import { useParams } from "react-router-dom";
import { produtos } from "../data/produtos";
import { useState } from "react";

function ProdutoDetalhes() {
  const { id } = useParams();
  const produto = produtos.find(p => p.id === Number(id));
  const [imagemAtual, setImagemAtual] = useState(0);

  if (!produto) return <div className="text-center text-2xl mt-20">Produto não encontrado</div>;

  return (
    <div className="mt-20 mb-20">
      <h1 className="text-4xl font-bold text-center mb-10">{produto.nome}</h1>

      <div className="grid md:grid-cols-2 gap-20">
        {/* Galeria */}
        <div>
          <img 
            src={produto.imagens[imagemAtual]} 
            alt={produto.nome} 
            className="gallery-main" 
          />
          <div className="gallery-thumbs">
            {produto.imagens.map((img, index) => (
              <img 
                key={index}
                src={img}
                alt={`Miniatura ${index + 1}`}
                className={`gallery-thumb ${imagemAtual === index ? "active" : ""}`}
                onClick={() => setImagemAtual(index)}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="text-left">
          <h2 className="text-3xl font-bold mb-5">{produto.jogador}</h2>
          <p className="text-xl mb-5">{produto.equipa}</p>
          <p className="text-4xl font-bold mb-10">{new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(produto.preco)}</p>
          <p className="mb-10">{produto.descricao}</p>
          <button className="btn-primary">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  );
}

export default ProdutoDetalhes;