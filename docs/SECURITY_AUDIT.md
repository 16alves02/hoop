# Security Audit Standard

> Objetivo: procedimento reutilizável de auditoria de segurança deste repositório. É uma checklist de engenharia, não um certificado de teste de intrusão, parecer jurídico ou garantia de segurança.
>
> Contexto registado ao adicionar este documento: React 19, TypeScript, Vite; catálogo, carrinho, sessão e checkout simulados em localStorage; sem backend nem processador de pagamentos.
>
> Confirma sempre este contexto no código atual. A arquitetura, as dependências e as funcionalidades podem ter mudado.

## 1. Regras de execução

- Começa por registar branch, commit, estado do working tree e ambiente.
- Não fazer deploy, publicar, fazer merge, executar migrações de produção, alterar painéis de fornecedores, rodar credenciais, reescrever histórico Git ou contactar utilizadores reais.
- Não usar dados de produção, contas reais, pagamentos reais ou sistemas externos sem autorização explícita.
- Nunca imprimir, copiar para relatórios ou commitar valores secretos. Registar apenas tipo de segredo, localização e ação recomendada.
- Não instalar dependências nem executar comandos destrutivos sem aprovação. Preferir ferramentas existentes e dados locais isolados.
- Preservar alterações existentes. Não fazer reset, clean, overwrite ou descartar trabalho alheio à auditoria.
- Corrigir vulnerabilidades confirmadas em alterações pequenas. Cada correção deve ter teste de regressão, teste que demonstra o problema antes da correção e passa depois, quando for seguro executar ambos.
- Se uma correção exigir painel de fornecedor, acesso de produção, migração de dados, rotação de segredo ou alteração material de autenticação/pagamentos, parar e pedir aprovação.

## 2. Primeira fase: compreender o projeto

Antes de testar, produzir:
1. Resumo da arquitetura em cinco linhas: tipo de aplicação, linguagens/frameworks, armazenamento, serviços externos e destinos de deployment.
2. Inventário de pontos de entrada: rotas HTTP/API, server actions, RPC, jobs, comandos CLI, deep links mobile, handlers de upload e interfaces administrativas, conforme existam.
3. Para cada ponto sensível, identificar autenticação, autorização, validação de inputs e verificação de propriedade dos dados, com ficheiro e linha.
4. Identificar dados sensíveis, fronteiras de confiança, papéis, segredos, integrações externas e operações financeiras ou irreversíveis.
5. Listar comandos existentes de testes, lint, typecheck, build, auditoria de dependências e deteção de segredos. Não presumir que existem.

Não inventar rotas, fornecedores, papéis, pagamentos, uploads, tabelas ou funcionalidades de IA. Marcar funcionalidades inexistentes como Não aplicável e justificar com evidência.

## 3. As 14 verificações

Para cada item usar um estado: **Seguro (com evidência)**, **Vulnerável**, **Não aplicável (com evidência)** ou **Validação manual necessária**. Registar gravidade, impacto, ficheiro/linha, prova, correção e teste de regressão.

1. **Autorização/admin (CWE-862):** cada página privilegiada, API, server action, job e comando deve validar o papel no servidor. Esconder controlos na interface não é autorização.
2. **Propriedade/IDOR (CWE-639):** tentar alterar IDs para aceder ou modificar registos de outro utilizador/workspace. Aplicar ownership e tenant scope em cada leitura/escrita/remoção; testar RLS quando exista.
3. **Segredos no cliente (CWE-798):** inspecionar bundles frontend, pacotes mobile, source maps e prefixos públicos de variáveis de ambiente. Chaves privilegiadas e service-role nunca podem ser enviadas ao cliente.
4. **Preços/totais (CWE-472):** quando existam compras ou créditos, calcular preços, descontos, impostos, portes e totais em código confiável do servidor. Não confiar em totais ou planos enviados pelo cliente.
5. **Validação de inputs (CWE-20):** validar tipo, intervalo, comprimento, formato, enumeração, nulabilidade e regras de negócio na fronteira de confiança. Definir limites e rejeitar valores malformados.
6. **Pagamentos (CWE-345):** se existirem, validar assinatura do webhook, ambiente, identidade do evento, encomenda, valor e moeda; tornar o processamento idempotente. Um redirect de sucesso no browser não prova pagamento.
7. **Race conditions (CWE-362):** proteger stock, cupões, saldos, convites, quotas e ações de uso único com transações, atualizações atómicas, constraints ou locks. Testar pedidos concorrentes.
8. **Mass assignment (CWE-915):** permitir apenas campos explicitamente autorizados. O cliente nunca deve definir role, permissões, owner, plano, saldo, estado de verificação ou propriedades privilegiadas.
9. **Brute force/abuso (CWE-307):** rever login, PIN, OTP, reset, convite e recuperação para rate limits, atrasos progressivos, controlos de abuso e mensagens de erro seguras.
10. **Prompt injection (OWASP LLM01):** se existir IA, tratar conteúdo do utilizador e documentos recuperados como não confiáveis. A IA não concede permissões nem decide movimentos financeiros. Restringir ferramentas, dados e exigir confirmação para ações consequentes.
11. **XSS (CWE-79):** tratar conteúdo do utilizador como texto; rever HTML, Markdown, rich text, URLs e sinks DOM. Sanitizar quando HTML for realmente necessário; rever CSP e cookies em aplicações web.
12. **Uploads (CWE-434):** se existirem, validar conteúdo/tipo real, extensão e tamanho; usar nomes gerados, armazenamento seguro e autorização; re-encodar imagens quando adequado; bloquear formatos ativos como HTML/SVG salvo suporte seguro explícito.
13. **Segredos no Git/histórico (CWE-540):** inspecionar ficheiros versionados, ignore rules, logs CI e histórico com scanners disponíveis. Não reescrever histórico nem rodar credenciais automaticamente. Segredos expostos devem ser tratados como comprometidos; pedir aprovação para rotação/remediação.
14. **Injeção/SQL (CWE-89):** usar queries parametrizadas ou APIs ORM seguras. Rever SQL raw, identificadores dinâmicos, filtros de pesquisa, comandos shell, caminhos de ficheiros e outras fronteiras de interpretação. Allowlist para identificadores dinâmicos.

## 4. Verificações adicionais por tipo de aplicação

- **Web/API:** CSRF quando existam sessões por cookie, CORS allowlist, cookies seguros, rotação/expiração de sessão, headers, allowlist de redirects, fuga de erros, cache e rate limits.
- **Mobile/PWA:** armazenamento local seguro, ciclo de vida de chaves, fugas em backups/exportações, validação de deep links, WebViews, permissões, TLS, logs, exposição por screenshots/clipboard e conteúdo da cache offline.
- **Base de dados/BaaS:** RLS ativa e testada com pelo menos duas identidades distintas; credenciais com privilégio mínimo; migrations revistas; filtros no frontend não contam como segurança.
- **CLI/desktop:** path traversal, desserialização insegura, execução de comandos, armazenamento local de credenciais, permissões de ficheiros e integridade de backups/restauros.
- **IA/workflows/integrações:** scopes OAuth mínimos, isolamento de tokens, assinatura de webhooks, proteção SSRF, limites de execução, redação de segredos e aprovações.
- **Sites estáticos:** confirmar que não existe backend escondido nem chave privilegiada no build; rever links externos, formulários, analytics, dependências, headers e exposição do deployment.

## 5. Processo de testes obrigatório

- Começar por inspeção read-only e verificações automatizadas existentes.
- Criar testes focados para cada problema confirmado. O teste deve falhar antes da correção e passar depois; se não for seguro executar antes, explicar.
- Executar primeiro o teste específico e depois suite relevante, typecheck/lint/build e scanners de dependências/segredos disponíveis.
- Usar fixtures locais isoladas. Para autorização e RLS, testar pelo menos dois utilizadores/tenants; mocks não provam políticas reais do fornecedor.
- Nunca declarar validação de produção, painel externo, dispositivo real ou pagamento real se não foi executada.
- Fazer um commit focado por vulnerabilidade corrigida com a mensagem security: <issue>, apenas se o workflow do repositório o permitir. Caso contrário, deixar as alterações sem commit e reportá-las.

## 6. Relatório final

Entregar:
- Resumo da arquitetura e inventário completo de pontos de entrada.
- Tabela das 14 verificações com estado, gravidade, evidência (ficheiro/linha), impacto, correção e teste.
- Achados adicionais específicos do tipo de aplicação.
- Comandos executados e resultados reais.
- Verificações manuais pendentes, incluindo painéis de fornecedores, dispositivos reais, RLS, rotação de segredos ou settings de deployment.
- Limitações e itens não testados.
- Plano manual curto com até cinco testes de maior valor.

## 7. Instrução pronta para agente de programação

Usa este documento como especificação da auditoria. Audita este repositório real, não uma aplicação genérica imaginada. Mapeia primeiro arquitetura e pontos de entrada. Avalia as 14 verificações e as verificações adicionais aplicáveis. Cita ficheiros e linhas exatos. Nunca marques Seguro sem evidência no código, nem Não aplicável sem justificação. Corrige apenas vulnerabilidades confirmadas, uma de cada vez, com teste de regressão. Mantém todo o trabalho local e isolado. Não faças deploy, não toques em dados de produção, não alteres painéis de fornecedores, não rodes segredos, não reescrevas histórico Git, não instales dependências e não alteres fluxos de autenticação/pagamento/produto sem aprovação explícita. Se não for possível provar algo localmente, marca Validação manual necessária e indica exatamente o acesso ou ação que falta. Termina com o relatório da secção 6.

## Referências

- OWASP Application Security Verification Standard (ASVS) v5.0.0: https://asvs.owasp.org/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/

Usa a versão estável ASVS v5.0.0 como referência base. Esta checklist, por si só, não demonstra conformidade ASVS.
