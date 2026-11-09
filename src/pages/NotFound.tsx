import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robotsMeta = existingRobots ?? document.createElement("meta");
    const previousRobots = robotsMeta.content;

    if (!existingRobots) {
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
    }

    document.title = "Página não encontrada | HOOP";
    robotsMeta.content = "noindex, follow";

    return () => {
      document.title = previousTitle;
      if (existingRobots) {
        robotsMeta.content = previousRobots;
      } else {
        robotsMeta.remove();
      }
    };
  }, []);

  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-card">
        <p className="not-found-kicker">HOOP / SYSTEM RESPONSE</p>
        <p className="not-found-code" aria-hidden="true">404</p>
        <p className="not-found-label">PÁGINA NÃO ENCONTRADA</p>
        <h1 id="not-found-title">Este endereço ficou fora de jogo.</h1>
        <p className="not-found-message">
          A página pode ter sido movida ou o endereço pode estar incorreto.
          Volta à loja para continuares a explorar a coleção.
        </p>
        <div className="not-found-actions">
          <Link className="not-found-button not-found-button-primary" to="/">
            Voltar à loja
          </Link>
          <Link className="not-found-button" to="/produtos">
            Explorar produtos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
