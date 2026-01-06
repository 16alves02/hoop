import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { produtos } from "../data/produtos"
import ProdutoCard from "../components/ProdutoCard"
import "../styles/Produtos.css"

const ITENS_POR_PAGINA = 20

function Produtos() {
  // searchParams controla todos os filtros via URL
  const [searchParams, setSearchParams] = useSearchParams()

  /* PARÂMETROS DA URL (source of truth) */

  const tipoParam = searchParams.get("tipo") || "todos"
  const generoParams = searchParams.getAll("genero")
  const tamanhoParams = searchParams.getAll("tamanho")
  const marcaParam = searchParams.get("marca") || "todos"
  const equipaParam = searchParams.get("equipa") || "todos"
  const corParams = searchParams.getAll("cor")
  const precoParam = searchParams.get("preco") || null
  const jogadorParam = searchParams.get("jogador") || "todos"
  const novidadeParam = searchParams.get("novidade") || "todos"
  const promocaoParam = searchParams.get("promocao") || "todos"
  const ordenacaoParam = searchParams.get("ordenar") || "relevancia"
  const paginaParam = parseInt(searchParams.get("pagina") || "1", 10)

  /* UI STATE (não influencia filtros) */

  const [paginaAtual, setPaginaAtual] = useState(paginaParam)
  const [mobileFiltrosOpen, setMobileFiltrosOpen] = useState(false)

  const [seccoesAbertas, setSeccoesAbertas] = useState<Set<string>>(
    new Set(["tipo", "genero", "tamanho", "preco", "marca", "jogador", "equipa", "cor", "ofertas"])
  )

  const toggleSeccao = (seccao: string) => {
    setSeccoesAbertas(prev => {
      const novo = new Set(prev)
      novo.has(seccao) ? novo.delete(seccao) : novo.add(seccao)
      return novo
    })
  }

  /* LISTAS DISPONÍVEIS */

  const tiposDisponiveis = ["todos", "camisola", "sapatilha", "bola", "acessorio"]
  const generosDisponiveis = ["homem", "mulher", "criança"]

  const tamanhosDisponiveis = [
    "S", "M", "L", "XL", "XXL", "XXXL",
    "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"
  ]

  const intervalosPreco = [
    { value: "0-50", label: "Até 50€" },
    { value: "50-100", label: "50€ - 100€" },
    { value: "100-200", label: "100€ - 200€" },
    { value: "200+", label: "Mais de 200€" }
  ]

  const marcasUnicas = useMemo(
    () => ["todos", ...Array.from(new Set(produtos.map(p => p.marca).filter((m): m is string => !!m)))],
    []
  )

  const equipasUnicas = useMemo(
    () => ["todos", ...Array.from(new Set(produtos.map(p => p.equipa).filter((e): e is string => !!e)))],
    []
  )

  const jogadoresUnicos = useMemo(
    () => ["todos", ...Array.from(new Set(produtos.map(p => p.jogador).filter((j): j is string => !!j)))],
    []
  )

  const todasCores = useMemo(() => {
    const cores = new Set<string>()
    produtos.forEach(p => p.cores?.forEach(c => cores.add(c.toLowerCase())))
    return Array.from(cores).sort()
  }, [])

  /* CONTAGENS PARA FILTROS */

  const contagens = useMemo(() => {
    const contar = (campo: "tipo" | "marca" | "equipa" | "jogador", valor: string) =>
      produtos.filter(p => {
        switch (campo) {
          case "tipo": return p.tipo === valor
          case "marca": return p.marca === valor
          case "equipa": return p.equipa === valor
          case "jogador": return p.jogador === valor
        }
      }).length

    return {
      tipos: Object.fromEntries(tiposDisponiveis.filter(t => t !== "todos").map(t => [t, contar("tipo", t)])),
      marcas: Object.fromEntries(marcasUnicas.filter(m => m !== "todos").map(m => [m, contar("marca", m)])),
      equipas: Object.fromEntries(equipasUnicas.filter(e => e !== "todos").map(e => [e, contar("equipa", e)])),
      jogadores: Object.fromEntries(jogadoresUnicos.filter(j => j !== "todos").map(j => [j, contar("jogador", j)])),
    }
  }, [])

  /* HELPERS DE URL */

  const atualizarFiltro = (chave: string, valor: string | string[] | null) => {
    const params = new URLSearchParams(searchParams)
    params.delete(chave)

    if (Array.isArray(valor)) {
      valor.forEach(v => params.append(chave, v))
    } else if (valor && valor !== "todos" && valor !== "") {
      params.set(chave, valor)
    }

    params.set("pagina", "1")
    setPaginaAtual(1)
    setSearchParams(params)
  }

  const toggleMultiFiltro = (chave: string, valor: string, atual: string[]) => {
    const novo = atual.includes(valor)
      ? atual.filter(v => v !== valor)
      : [...atual, valor]

    atualizarFiltro(chave, novo.length ? novo : [])
  }

  /* FILTRAGEM PRINCIPAL */

  const produtosFiltrados = useMemo(() => {
    let lista = [...produtos]

    if (tipoParam !== "todos") lista = lista.filter(p => p.tipo === tipoParam)
    if (marcaParam !== "todos") lista = lista.filter(p => p.marca === marcaParam)
    if (equipaParam !== "todos") lista = lista.filter(p => p.equipa === equipaParam)
    if (jogadorParam !== "todos") lista = lista.filter(p => p.jogador === jogadorParam)

    if (generoParams.length) {
      lista = lista.filter(p => {
        if (!p.genero) return false
        if (p.genero === "unisex") return generoParams.includes("homem") || generoParams.includes("mulher")
        return generoParams.includes(p.genero)
      })
    }

    if (tamanhoParams.length) {
      lista = lista.filter(p => p.tamanhos?.some(t => tamanhoParams.includes(t)))
    }

    if (corParams.length) {
      lista = lista.filter(p => p.cores?.some(c => corParams.includes(c.toLowerCase())))
    }

    if (precoParam) {
      const [minStr, maxStr] = precoParam.split("-")
      const min = Number(minStr)
      const max = maxStr === "+" ? Infinity : Number(maxStr)
      lista = lista.filter(p => p.preco >= min && (max === Infinity || p.preco <= max))
    }

    if (novidadeParam === "sim") {
      lista = lista.filter(p => /protro|2025|novo/i.test(p.nome))
    }

    if (promocaoParam === "sim") {
      lista = lista.filter(p => p.preco < 120)
    }

    const ordenados = [...lista]
    switch (ordenacaoParam) {
      case "preco-asc":
        ordenados.sort((a, b) => a.preco - b.preco)
        break
      case "preco-desc":
        ordenados.sort((a, b) => b.preco - a.preco)
        break
      case "nome":
        ordenados.sort((a, b) => a.nome.localeCompare(b.nome))
        break
      case "novos":
        ordenados.sort((a, b) => b.id - a.id)
        break
    }

    return ordenados
  }, [
    tipoParam, generoParams, tamanhoParams, marcaParam, equipaParam,
    corParams, precoParam, jogadorParam, novidadeParam, promocaoParam, ordenacaoParam
  ])

  /* PAGINAÇÃO */

  const totalPaginas = Math.ceil(produtosFiltrados.length / ITENS_POR_PAGINA)

  const produtosPaginados = produtosFiltrados.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  )

  const mudarPagina = (p: number) => {
    if (p < 1 || p > totalPaginas) return
    setPaginaAtual(p)
    const params = new URLSearchParams(searchParams)
    params.set("pagina", String(p))
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const resetFiltros = () => {
    setSearchParams({})
    setPaginaAtual(1)
  }

  /* RENDER */

  return (
    <div className="produtos-page">
      <h1 className="produtos-titulo">Coleção Completa</h1>

      {/* Botão mobile para abrir filtros */}
      <button
        className="mobile-filtros-toggle"
        onClick={() => setMobileFiltrosOpen(!mobileFiltrosOpen)}
      >
        Filtros {mobileFiltrosOpen ? "-" : "+"}
      </button>

      <div className={`produtos-filtros-container ${mobileFiltrosOpen ? "open" : ""}`}>
        <aside className="produtos-filtros-sidebar">

          {/* Header dos filtros */}
          <div className="filtros-header">
            <h3 className="filtros-titulo">Filtros</h3>
            {searchParams.toString() && (
              <button className="filtros-reset" onClick={resetFiltros}>
                Limpar Tudo
              </button>
            )}
          </div>

          {/* TIPO */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("tipo")}>
              Tipo <span className="filtro-icon">{seccoesAbertas.has("tipo") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("tipo") && (
              <div className="filtro-conteudo">
                {tiposDisponiveis.filter(t => t !== "todos").map(tipo => (
                  <label key={tipo} className="filtro-checkbox">
                    <input
                      type="radio"
                      name="tipo"
                      checked={tipoParam === tipo}
                      onChange={() => atualizarFiltro("tipo", tipo)}
                    />
                    <span>
                      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                      {" "}
                      ({contagens.tipos[tipo] ?? 0})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* GÉNERO */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("genero")}>
              Género <span className="filtro-icon">{seccoesAbertas.has("genero") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("genero") && (
              <div className="filtro-conteudo">
                {generosDisponiveis.map(g => (
                  <label key={g} className="filtro-checkbox">
                    <input
                      type="checkbox"
                      checked={generoParams.includes(g)}
                      onChange={() => toggleMultiFiltro("genero", g, generoParams)}
                    />
                    <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* TAMANHO */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("tamanho")}>
              Tamanho <span className="filtro-icon">{seccoesAbertas.has("tamanho") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("tamanho") && (
              <div className="filtro-conteudo">
                <div className="filtro-tamanhos">
                  {tamanhosDisponiveis.map(t => (
                    <button
                      key={t}
                      className={`filtro-tamanho-btn ${tamanhoParams.includes(t) ? "ativo" : ""}`}
                      onClick={() => toggleMultiFiltro("tamanho", t, tamanhoParams)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PREÇO */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("preco")}>
              Preço <span className="filtro-icon">{seccoesAbertas.has("preco") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("preco") && (
              <div className="filtro-conteudo">
                {intervalosPreco.map(i => (
                  <label key={i.value} className="filtro-checkbox">
                    <input
                      type="radio"
                      name="preco"
                      checked={precoParam === i.value}
                      onChange={() => atualizarFiltro("preco", i.value)}
                    />
                    <span>{i.label}</span>
                  </label>
                ))}

                <label className="filtro-checkbox">
                  <input
                    type="radio"
                    name="preco"
                    checked={precoParam === null}
                    onChange={() => atualizarFiltro("preco", null)}
                  />
                  <span>Todos os preços</span>
                </label>
              </div>
            )}
          </div>

          {/* MARCA */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("marca")}>
              Marca <span className="filtro-icon">{seccoesAbertas.has("marca") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("marca") && (
              <div className="filtro-conteudo">
                {marcasUnicas.filter(m => m !== "todos").map(m => (
                  <label key={m} className="filtro-checkbox">
                    <input
                      type="radio"
                      name="marca"
                      checked={marcaParam === m}
                      onChange={() => atualizarFiltro("marca", m)}
                    />
                    <span>{m} ({contagens.marcas[m] ?? 0})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* JOGADOR */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("jogador")}>
              Jogador <span className="filtro-icon">{seccoesAbertas.has("jogador") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("jogador") && (
              <div className="filtro-conteudo">
                {jogadoresUnicos.filter(j => j !== "todos").map(j => (
                  <label key={j} className="filtro-checkbox">
                    <input
                      type="radio"
                      name="jogador"
                      checked={jogadorParam === j}
                      onChange={() => atualizarFiltro("jogador", j)}
                    />
                    <span>{j} ({contagens.jogadores[j] ?? 0})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* EQUIPA */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("equipa")}>
              Equipa <span className="filtro-icon">{seccoesAbertas.has("equipa") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("equipa") && (
              <div className="filtro-conteudo">
                {equipasUnicas.filter(e => e !== "todos").map(e => (
                  <label key={e} className="filtro-checkbox">
                    <input
                      type="radio"
                      name="equipa"
                      checked={equipaParam === e}
                      onChange={() => atualizarFiltro("equipa", e)}
                    />
                    <span>{e} ({contagens.equipas[e] ?? 0})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* COR */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("cor")}>
              Cor <span className="filtro-icon">{seccoesAbertas.has("cor") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("cor") && (
              <div className="filtro-conteudo">
                <div className="filtro-cores-grid">
                  {todasCores.map(cor => (
                    <button
                      key={cor}
                      className={`filtro-cor-btn ${corParams.includes(cor) ? "ativo" : ""}`}
                      style={{
                        backgroundColor: cor,
                        border: ["branco", "white"].includes(cor.toLowerCase())
                          ? "2px solid #ccc"
                          : "none"
                      }}
                      onClick={() => toggleMultiFiltro("cor", cor, corParams)}
                      aria-label={`Filtrar por ${cor}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* OFERTAS */}
          <div className="filtro-seccao expansivel">
            <h4 onClick={() => toggleSeccao("ofertas")}>
              Ofertas <span className="filtro-icon">{seccoesAbertas.has("ofertas") ? "-" : "+"}</span>
            </h4>

            {seccoesAbertas.has("ofertas") && (
              <div className="filtro-conteudo">
                <label className="filtro-checkbox">
                  <input
                    type="checkbox"
                    checked={novidadeParam === "sim"}
                    onChange={e => atualizarFiltro("novidade", e.target.checked ? "sim" : "todos")}
                  />
                  <span>Novidades</span>
                </label>

                <label className="filtro-checkbox">
                  <input
                    type="checkbox"
                    checked={promocaoParam === "sim"}
                    onChange={e => atualizarFiltro("promocao", e.target.checked ? "sim" : "todos")}
                  />
                  <span>Em Promoção</span>
                </label>
              </div>
            )}
          </div>
        </aside>

        {/* LISTA DE PRODUTOS + ORDENAÇÃO */}
        <div className="produtos-grid-container">

          {/* Header da grelha */}
          <div className="produtos-header">
            <p className="produtos-count">
              {produtosFiltrados.length} produto
              {produtosFiltrados.length !== 1 ? "s" : ""}
            </p>

            <select
              className="produtos-ordenar"
              value={ordenacaoParam}
              onChange={e => atualizarFiltro("ordenar", e.target.value)}
            >
              <option value="relevancia">Mais relevantes</option>
              <option value="novos">Mais recentes</option>
              <option value="preco-asc">Preço: baixo → alto</option>
              <option value="preco-desc">Preço: alto → baixo</option>
              <option value="nome">Nome A-Z</option>
            </select>
          </div>

          {/* Caso não haja produtos */}
          {produtosPaginados.length === 0 ? (
            <p className="produtos-vazio">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          ) : (
            <>
              {/* Grelha de produtos */}
              <div className="produtos-grid card-grid">
                {produtosPaginados.map(produto => (
                  <ProdutoCard key={produto.id} produto={produto} />
                ))}
              </div>

              {/* PAGINAÇÃO */}
              {totalPaginas > 1 && (
                <div className="produtos-paginacao">

                  {/* Botão anterior */}
                  <button
                    className="paginacao-btn"
                    onClick={() => mudarPagina(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                  >
                    ←
                  </button>

                  {/* Números das páginas */}
                  {Array.from({ length: Math.min(7, totalPaginas) }, (_, i) => {
                    let pagina = i + 1

                    if (totalPaginas > 7 && paginaAtual > 4) {
                      pagina = paginaAtual - 3 + i
                      if (pagina < 1) pagina = i + 1
                    }

                    if (pagina > totalPaginas) pagina = totalPaginas

                    return (
                      <button
                        key={pagina}
                        className={`paginacao-btn ${paginaAtual === pagina ? "ativo" : ""}`}
                        onClick={() => mudarPagina(pagina)}
                      >
                        {pagina}
                      </button>
                    )
                  })}

                  {/* Reticências quando há mais páginas */}
                  {totalPaginas > 7 && paginaAtual < totalPaginas - 3 && (
                    <span className="paginacao-ellipsis">...</span>
                  )}

                  {/* Botão para última página */}
                  {totalPaginas > 7 && paginaAtual < totalPaginas - 3 && (
                    <button
                      className="paginacao-btn"
                      onClick={() => mudarPagina(totalPaginas)}
                    >
                      {totalPaginas}
                    </button>
                  )}

                  {/* Botão seguinte */}
                  <button
                    className="paginacao-btn"
                    onClick={() => mudarPagina(paginaAtual + 1)}
                    disabled={paginaAtual === totalPaginas}
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Produtos;