import { useState } from "react"
import "../styles/FAQ.css"

interface Pergunta {
  pergunta: string
  resposta: string
}

const perguntas: Pergunta[] = [
  {
    pergunta: "Os produtos da HOOP são originais?",
    resposta:
      "Sim. Todos os produtos apresentados no catálogo HOOP são 100% originais. Esta plataforma é um projeto académico fictício, criado apenas para fins educativos."
  },
  {
    pergunta: "A HOOP faz envios reais?",
    resposta:
      "Não. A HOOP não realiza envios reais. Todas as encomendas e processos de compra são simulados para efeitos de demonstração."
  },
  {
    pergunta: "Como funciona o carrinho de compras?",
    resposta:
      "O carrinho utiliza o localStorage do navegador para guardar os produtos adicionados. Ao fechar ou atualizar a página, os itens mantêm-se guardados."
  },
  {
    pergunta: "Posso finalizar uma compra?",
    resposta:
      "O botão de finalizar compra é apenas ilustrativo. Nenhum pagamento real é processado."
  },
  {
    pergunta: "Posso remover ou alterar quantidades no carrinho?",
    resposta:
      "Sim. É possível aumentar, diminuir ou remover produtos diretamente na página do carrinho."
  },
  {
    pergunta: "Este site representa uma loja real?",
    resposta:
      "Não. A HOOP é um projeto académico focado exclusivamente no basquetebol, desenvolvido para demonstrar conceitos de desenvolvimento web."
  }
]

function FAQ() {
  const [ativa, setAtiva] = useState<number | null>(null)

  const togglePergunta = (index: number) => {
    setAtiva(ativa === index ? null : index)
  }

  return (
    <div className="faq-page">
      <h1 className="faq-titulo">Perguntas Frequentes (FAQ)</h1>

      <div className="faq-lista">
        {perguntas.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-pergunta"
              onClick={() => togglePergunta(index)}
            >
              {item.pergunta}
              <span className="faq-icon">
                {ativa === index ? "−" : "+"}
              </span>
            </button>

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