import "../styles/GuiaDeTamanhos.css"

function GuiaDeTamanhos() {
  return (
    <section className="tamanhos-page">
      <h1 className="tamanhos-titulo">Guia de Tamanhos</h1>

      <p className="tamanhos-intro">
        Encontra o tamanho ideal para garantir máximo conforto e performance.
        As medidas podem variar ligeiramente entre marcas e modelos, por isso
        recomendamos consultar as tabelas abaixo antes de finalizar a compra.
      </p>

      {/* Sapatilhas */}
      <div className="tamanhos-bloco">
        <h2 className="tamanhos-subtitulo">Sapatilhas</h2>
        <p className="tamanhos-texto">
          Para medir o teu pé, coloca-o sobre uma folha, marca o calcanhar e a ponta do dedo maior,
          e mede a distância entre os dois pontos.
        </p>

        <div className="tabela-scroll">
          <table className="tamanhos-tabela">
            <thead>
              <tr>
                <th>EU</th>
                <th>US</th>
                <th>UK</th>
                <th>CM</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>40</td><td>7</td><td>6</td><td>25</td></tr>
              <tr><td>41</td><td>8</td><td>7</td><td>26</td></tr>
              <tr><td>42</td><td>8.5</td><td>7.5</td><td>26.5</td></tr>
              <tr><td>43</td><td>9</td><td>8</td><td>27</td></tr>
              <tr><td>44</td><td>10</td><td>9</td><td>28</td></tr>
              <tr><td>45</td><td>11</td><td>10</td><td>29</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Roupa */}
      <div className="tamanhos-bloco">
        <h2 className="tamanhos-subtitulo">Roupa (Homem)</h2>

        <div className="tabela-scroll">
          <table className="tamanhos-tabela">
            <thead>
              <tr>
                <th>Tamanho</th>
                <th>Peito (cm)</th>
                <th>Cintura (cm)</th>
                <th>Altura (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>S</td><td>88-96</td><td>73-81</td><td>165-175</td></tr>
              <tr><td>M</td><td>96-104</td><td>81-89</td><td>170-180</td></tr>
              <tr><td>L</td><td>104-112</td><td>89-97</td><td>175-185</td></tr>
              <tr><td>XL</td><td>112-124</td><td>97-109</td><td>180-195</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* NBA Jerseys */}
      <div className="tamanhos-bloco">
        <h2 className="tamanhos-subtitulo">NBA Jerseys</h2>
        <p className="tamanhos-texto">
          As camisolas NBA têm um corte mais largo e comprido. Se preferires um fit mais justo,
          recomendamos escolher um tamanho abaixo.
        </p>

        <div className="tabela-scroll">
          <table className="tamanhos-tabela">
            <thead>
              <tr>
                <th>Tamanho</th>
                <th>Peito (cm)</th>
                <th>Comprimento (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>S</td><td>88-96</td><td>73</td></tr>
              <tr><td>M</td><td>96-104</td><td>75</td></tr>
              <tr><td>L</td><td>104-112</td><td>77</td></tr>
              <tr><td>XL</td><td>112-124</td><td>79</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Acessórios */}
      <div className="tamanhos-bloco">
        <h2 className="tamanhos-subtitulo">Acessórios</h2>

        <ul className="tamanhos-lista">
          <li><strong>Meias:</strong> Tamanho único (39-46)</li>
          <li><strong>Bonés:</strong> Ajustáveis (strapback ou snapback)</li>
          <li><strong>Mangas de braço:</strong> S/M (25-30 cm), L/XL (30-35 cm)</li>
        </ul>
      </div>

      {/* Nota final */}
      <p className="tamanhos-nota">
        As medidas são aproximadas e podem variar entre marcas. Em caso de dúvida,
        recomendamos escolher o tamanho acima.
      </p>
    </section>
  )
}

export default GuiaDeTamanhos;