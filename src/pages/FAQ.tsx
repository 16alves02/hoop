import { useState } from "react"
import "../styles/FAQ.css"

interface Pergunta {
  pergunta: string
  resposta: string
}
const perguntas: Pergunta[] = [
  {
    pergunta: "Os produtos da HOOP são mesmo originais?",
    resposta:
      "Sim. Todo o catálogo da HOOP é composto por produtos 100% originais. Apesar de ser um projeto académico, o objetivo é recriar a experiência de uma loja real com artigos autênticos de basquetebol."
  },
  {
    pergunta: "A HOOP envia encomendas reais?",
    resposta:
      "Ainda não. A HOOP é um projeto académico e não processa envios reais. Todo o processo de compra, pagamento e entrega é simulado apenas para demonstração."
  },
  {
    pergunta: "Como é que o carrinho de compras funciona?",
    resposta:
      "O carrinho usa o localStorage do teu navegador para guardar os produtos. Mesmo que feches o site ou atualizes a página, os itens continuam lá até os removeres manualmente."
  },
  {
    pergunta: "Posso mesmo finalizar uma compra?",
    resposta:
      "Podes simular todo o processo, mas nenhum pagamento real é efetuado. O checkout serve apenas para mostrar como funcionaria numa loja verdadeira."
  },
  {
    pergunta: "Consigo alterar quantidades ou remover produtos?",
    resposta:
      "Sim. No carrinho podes aumentar, diminuir ou remover produtos sempre que quiseres. Tudo funciona como numa loja real, só não há transações verdadeiras."
  },
  {
    pergunta: "A HOOP é uma loja oficial?",
    resposta:
      "Não. A HOOP é um projeto académico dedicado ao basquetebol, criado para treinar desenvolvimento web e design de e-commerce. Não representa nenhuma marca ou entidade oficial."
  }
]

function FAQ() {
  // Estado simples para controlar qual pergunta está aberta
  const [ativa, setAtiva] = useState<number | null>(null)

  // Abre/fecha a pergunta clicada
  const togglePergunta = (index: number) => {
    setAtiva(ativa === index ? null : index)
  }

  return (
    <div className="faq-page">
      <h1 className="faq-titulo">Perguntas Frequentes (FAQ)</h1>

      <div className="faq-lista">
        {perguntas.map((item, index) => (
          <div key={index} className="faq-item">

            {/* Botão da pergunta */}
            <button
              className="faq-pergunta"
              onClick={() => togglePergunta(index)}
            >
              {item.pergunta}
              <span className="faq-icon">
                {ativa === index ? "-" : "+"}
              </span>
            </button>

            {/* Resposta só aparece se a pergunta estiver ativa */}
            {ativa === index && (
              <div className="faq-resposta">
                <p>{item.resposta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ;