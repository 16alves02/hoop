import { useState } from "react"

interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

// Componente simples para gerir o carregamento de imagens
// A ideia aqui é evitar aquele flash chato quando a imagem ainda não carregou
// Enquanto isso acontece, mostro um spinner e só depois deixo a imagem aparecer
function ImageLoader({ src, alt, className = "", style }: ImageLoaderProps) {
  // Estado para saber se a imagem já carregou ou não
  // Quando o onLoad dispara, passo isto para true e escondo o spinner
  const [loaded, setLoaded] = useState(false)

  return (
    // Wrapper para controlar o posicionamento e meter um fundo escuro enquanto a imagem não aparece
    <div
      className={`image-loader-wrapper ${className}`}
      style={{ position: "relative", background: "#1a1a1a" }}
    >
      {/* Se a imagem ainda não carregou, mostro o spinner
          Isto evita que o utilizador veja um buraco vazio no layout */}
      {!loaded && (
        <div className="image-loader-spinner">
          <div className="spinner"></div>
        </div>
      )}

      {/* A imagem em si
          - loading="lazy" para poupar performance
          - classes mudam conforme o estado para permitir animações tipo fade-in */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "loaded" : "loading"}`}
        style={style}
        onLoad={() => setLoaded(true)} // Quando a imagem carregar, atualizo o estado
        loading="lazy"
      />
    </div>
  )
}

export default ImageLoader;