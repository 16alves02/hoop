import { useState } from "react"

interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

function ImageLoader({ src, alt, className = "", style }: ImageLoaderProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`image-loader-wrapper ${className}`} style={{ position: "relative", background: "#1a1a1a" }}>
      {!loaded && (
        <div className="image-loader-spinner">
          <div className="spinner"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "loaded" : "loading"}`}
        style={style}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  )
}

export default ImageLoader;