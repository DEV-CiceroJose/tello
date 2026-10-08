# Pesquisa de conteúdo do Tello

Consulta: 4–5 de outubro de 2026. Prioridade: ENEM. A seleção privilegia documentos das instituições responsáveis, preservação dos cadernos e correção verificável. O acervo é uma base de estudo em expansão, não promessa de cobertura integral de qualquer edital.

## Banco entregue

| Trilha | Autorais com comentário | Oficiais com gabarito | Total |
|---|---:|---:|---:|
| ENEM | 231 | 535 | 766 |
| PM-PE | 258 | 319 | 577 |

As 120 novas questões autorais são exercícios distintos de Português, raciocínio lógico e informática (40 por área). Não são apresentadas como questões de banca. As oficiais ainda não têm resolução comentada no Tello; o aplicativo informa essa limitação.

## Provas e procedência

- [INEP — provas e gabaritos](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos): aplicação regular 2023, 2024 e 2025; caderno azul 1 no primeiro dia e azul 7 no segundo. Uma única cor evita contar as mesmas questões em diferentes ordens. Inglês é a opção interativa; espanhol permanece disponível nos PDFs e na biblioteca de apoio.
- [UPE — Soldado 2009](https://www.upenet.com.br/concluido/2009/pm09/pm09.html): 48 de 50 questões válidas.
- [UPE — Oficial 2014](https://www.upenet.com.br/concluido/2014/oficial_PM_14/oficial_PM_14.html): 92 de 100; primeiro conjunto de inglês e segundo conjunto comum. Excluída a repetição de espanhol.
- [UPE — Soldado 2016](https://www.upenet.com.br/concluido/2016/16_pm_16/PM_16.html): 57 de 60; caderno branco e respectiva página do gabarito definitivo. O original marca respostas em cinza. A cópia `estudo.pdf` remove somente os fundos com operador de cinza 0.827; texto extraído é comparado integralmente e os originais são preservados. A correção usa o gabarito definitivo, não os destaques preliminares.
- [UPE — Soldado 2018](https://www.upenet.com.br/concluido/2018/18_pm/PM_18.html): 56 de 60; caderno 01.
- [UPE — Oficial 2018](https://www.upenet.com.br/concluido/2018/18_cfo/CFO_18_provas_Gab.html): 66 de 70; caderno A, inglês, gabarito definitivo **republicado por incorreções**.

26 questões anuladas foram excluídas da prática e dos simulados: 5 ENEM e 21 PM-PE. A relação por prova está em `exam-library.json` e na interface. Não há duplicação de cores, nem mistura de gabaritos de cadernos distintos.

PM-PE contém 161 questões oficiais de Soldado e 158 de Oficial. Com as autorais, são 419 para a seleção Soldado e 158 de Oficial. O total de 577 é da trilha completa, e não de um único cargo. Geografia e parte das matérias jurídicas pertencem a editais históricos. Os simulados PM-PE começam no escopo Soldado; Oficial é uma escolha explícita. As provas AOCP 2024 foram procuradas, mas não incorporadas sem um par de caderno e gabarito definitivo conferível na origem.

Os PDFs e transcrições estão em `frontend/public/exams`. O manifesto registra endereço da prova, gabarito, página de publicação, tamanho e SHA-256. As assinaturas são impressões dos arquivos baixados, não certificados de autenticidade emitidos pelas bancas. O servidor de downloads do INEP apresentou falha na cadeia de certificados nesta consulta; os PDFs públicos foram obtidos pelo endereço HTTP do mesmo domínio oficial, sem desativar verificação TLS. Os links canônicos HTTPS foram mantidos no manifesto. O restaurador usa HTTPS e interrompe em falha de conexão ou divergência de conteúdo.

## Material selecionado por área

- [Canal CECIERJ — pré-vestibular](https://canal.cecierj.edu.br/conteudo/pre_vestibular_social/): 20 volumes, dois por componente (Matemática, Português, Redação, Biologia, Física, Química, História, Geografia, Inglês e Espanhol). Links apontam para páginas de recursos com autoria e download, sem reempacotar apostilas comerciais.
- [USP / Univesp — aulas para vestibular](https://univesp.br/univesp-tv-apresenta-novas-videoaulas-voltadas-ao-vestibular/): 16 aulas selecionadas de Matemática e Natureza. Os endereços de vídeo vêm da página da universidade. Disponibilidade e legendas dependem da plataforma externa; não há promessa de funcionamento permanente.
- [Univesp — matemática elementar](https://cursos.univesp.br/courses/1051/modules): sequência para retomar a base; atividades institucionais podem pedir autenticação.
- [INEP — matriz, cartilhas e manuais](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/outros-documentos): referência para o escopo ENEM; a cartilha da redação 2026 é a referência atual consultada.
- [ALEPE — Estatuto dos Militares](https://legis.alepe.pe.gov.br/texto.aspx?id=1032&tipo=TEXTOATUALIZADO) e [PMPE Lex](https://www.pm.pe.gov.br/decretos-pmpe-legis/): acesso ao texto atualizado e índice oficial de normas. Questão jurídica histórica não deve ser usada como regra vigente sem conferência.
- [Planalto — Constituição](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) e [ONU — Declaração Universal](https://www.un.org/en/about-us/universal-declaration-of-human-rights): fontes para as leituras de direitos fundamentais e humanos. A ONU bloqueou a consulta automatizada nesta rodada; o link institucional existente foi mantido como referência, sem afirmar nova validação integral.
- [Fundaj — Pesquisa Escolar](https://pesquisaescolar.fundaj.gov.br/): verbetes regionais; o portal apresentou timeout na verificação automatizada. O recurso é indicado como acervo complementar, não como apostila completa do edital.
- [CERT.br — cartilha de segurança](https://cartilha.cert.br/) e [Microsoft — referências de planilha](https://support.microsoft.com/pt-br/excel/switch-between-relative-absolute-and-mixed-references): apoio aos exercícios de informática.

O roteiro editorial organiza a sequência de estudo, mas não substitui a matriz do exame nem o edital. A data de consulta de uma página não significa revisão pedagógica integral de todos os livros ou atualização de todas as questões históricas. As 57 aulas autorais anteriores foram preservadas.

## Manutenção e validação

1. Para nova edição, escolher um caderno e seu gabarito definitivo, com prova/cargo/cor/idioma explícitos; registrar no manifesto.
2. Baixar, conferir visualmente capa e algumas páginas e comparar a numeração completa do gabarito. Registrar anulações.
3. Executar `python scripts/import-exams.py` (Poppler e `research/requirements.txt` necessários) e revisar localização dos itens e transcrições. Não usar texto extraído como substituto de diagramas.
4. Editar questões autorais em `research/authored/pmpe-foundations.txt` e executar `python scripts/import-authored.py`. Uma linha por item, cinco opções únicas e comentário específico.
5. `npm ci`, `npm test`, `NITRO_PRESET=node-server npm run build`. O build copia fontes e decodificadores locais do PDF.js; o leitor é carregado sob demanda.
6. Testar filtro por prova/cargo, resposta, caderno de erros, leitor/zoom/páginas e simulado. Não publicar itens sem resposta validada nem chamar gabarito de resolução comentada.

O workspace raiz foi alinhado ao lockfile já existente (frontend e backend). Isso permite instalação reprodutível e os comandos de teste/build na raiz; não há mudança de autenticação ou regras Firebase.
