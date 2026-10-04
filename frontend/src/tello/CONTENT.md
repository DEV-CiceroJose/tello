# Acervo do Tello

O acervo local contém 57 aulas e 369 questões autorais comentadas: 231 para o ENEM e 138 para a PM-PE. As questões são de treino, não reproduções oficiais de provas. As aulas estão divididas nas quatro áreas do ENEM e em sete áreas da PM-PE, incluindo legislação estadual.

## Como ampliar

- `catalog.js` define áreas, trilhas e fontes; cada aula tem identificador estável, área, texto, exemplo e referência.
- `expanded-content.js` reúne aulas e questões conceituais. Um tópico novo recebe um `id` inédito e cinco cartões de aplicação; cada cartão gera uma questão com cinco alternativas do mesmo tema.
- `variable-questions.js` reúne séries de problemas numéricos com dados e resoluções diferentes. Acrescente um modelo com `id` inédito para preservar o histórico de respostas.
- `questions.js` mantém as questões autorais originais. A composição final conserva os IDs existentes, para que progresso e caderno de erros não sejam perdidos.
- `use-catalog.js` pagina as questões da coleção `telloQuestions` do Firestore em lotes de 250, sem teto total. Questões publicadas na nuvem podem complementar o acervo local.

Execute `npm test` e `npm run build` na raiz após editar. O teste de integridade confere IDs, enunciados, alternativas, gabarito, explicação, vínculo com aulas e cobertura por área.

Para publicar o acervo no Firebase `tello-31768`, configure credenciais de administrador **somente no ambiente de servidor**, confira a saída de `npm run seed:tello -- --dry-run` e então execute `npm run seed:tello`. A publicação usa IDs estáveis e lotes de até 400 gravações; executá-la novamente atualiza os mesmos documentos. Nunca coloque credenciais privadas no frontend.

As aulas sobre PM-PE apontam para os textos atualizados da ALEPE e para a [biblioteca de normas da PMPE](https://www.pm.pe.gov.br/decretos-pmpe-legis/). Antes de acrescentar detalhes jurídicos, confirme a redação vigente e o edital específico do concurso. A trilha atual usa o edital de Soldado de 2023 como referência de planejamento.
