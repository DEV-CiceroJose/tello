// Aulas e itens autorais. Cada cartão descreve uma aplicação concreta de um
// conceito; as cinco alternativas pertencem ao mesmo tópico da aula.
export const EXPANDED_TOPICS = [
  {
    id: "geometria-plana",
    subject: "matematica",
    title: "Geometria plana",
    subtitle: "Perímetro, área e semelhança",
    minutes: 25,
    paragraphs: [
      "Perímetro mede o contorno; área mede a superfície. Um retângulo de lados a e b tem perímetro 2(a+b) e área ab. No triângulo, a área é base vezes altura dividido por dois; a altura é perpendicular à base escolhida.",
      "Figuras semelhantes preservam ângulos e têm lados correspondentes proporcionais. Se os lados são multiplicados por k, os perímetros também são multiplicados por k, mas as áreas por k².",
      "Em problemas contextualizados, desenhe a figura, anote as unidades e confira se a resposta pede comprimento ou superfície. Não confunda diagonal com lado e não some áreas que se sobrepõem.",
    ],
    example: "Um jardim de 6 m por 4 m exige 20 m de cerca e ocupa 24 m².",
    takeaway: "Escolha a fórmula pela grandeza pedida e mantenha as unidades.",
    terms: [
      [
        "A quantidade de cerca para contornar um terreno corresponde a quê?",
        "Perímetro",
        "É a soma dos comprimentos do contorno.",
      ],
      [
        "A quantidade de piso para cobrir um cômodo corresponde a quê?",
        "Área",
        "É a medida da superfície coberta.",
      ],
      [
        "Em um triângulo, o segmento perpendicular à base usado no cálculo da área é a:",
        "Altura",
        "A altura forma ângulo reto com a base escolhida.",
      ],
      [
        "Dois mapas de uma mesma figura mantêm ângulos e lados proporcionais. A relação é de:",
        "Semelhança",
        "Figuras semelhantes têm razões constantes entre lados correspondentes.",
      ],
      [
        "Um quadrado ampliado tem lado triplicado; sua área fica nove vezes maior. Isso ilustra:",
        "Escala quadrática",
        "A área varia com o quadrado do fator linear.",
      ],
    ],
  },
  {
    id: "geometria-espacial",
    subject: "matematica",
    title: "Sólidos e capacidade",
    subtitle: "Volume, unidades e planificações",
    minutes: 25,
    paragraphs: [
      "Volume mede o espaço ocupado por um sólido. No paralelepípedo retângulo, V = comprimento × largura × altura; no cilindro, V = área da base × altura.",
      "A capacidade de um recipiente relaciona-se ao volume interno: 1 litro corresponde a 1 dm³, e 1 m³ corresponde a 1.000 litros. Antes de calcular, converta todas as medidas para a mesma unidade.",
      "A área superficial mede o material para revestir o sólido, e não o que cabe dentro dele. Uma planificação mostra as faces abertas no plano, útil para contar o material de uma embalagem.",
    ],
    example: "Uma caixa de 2 dm × 3 dm × 4 dm tem volume de 24 dm³, ou 24 L.",
    takeaway: "Volume, capacidade e área superficial respondem perguntas diferentes.",
    terms: [
      [
        "O espaço interno disponível numa caixa é medido pelo:",
        "Volume",
        "Volume é a medida tridimensional do espaço ocupado ou comportado.",
      ],
      [
        "Uma garrafa é rotulada com 2 L. A grandeza em destaque é:",
        "Capacidade",
        "Litros expressam a capacidade do recipiente.",
      ],
      [
        "A quantidade de papel necessária para encapar uma caixa depende da:",
        "Área superficial",
        "Somam-se as áreas das faces a revestir.",
      ],
      [
        "Ao abrir uma caixa de papelão e estender suas faces num plano, obtemos sua:",
        "Planificação",
        "A planificação representa as faces do sólido no plano.",
      ],
      [
        "Uma caixa com volume de 1 dm³ comporta exatamente:",
        "1 litro",
        "Por definição, 1 dm³ equivale a 1 L.",
      ],
    ],
  },
  {
    id: "juros",
    subject: "matematica",
    title: "Educação financeira",
    subtitle: "Juros, inflação e poder de compra",
    minutes: 25,
    paragraphs: [
      "Juros simples incidem sempre sobre o capital inicial: M = C(1+it), com taxa i e tempo t em unidades compatíveis. Juros compostos incidem sobre o saldo acumulado: M = C(1+i)^t.",
      "Taxa nominal é o percentual informado; o ganho real considera também a inflação. Se preços e renda sobem em percentuais diferentes, compare o poder de compra, e não apenas valores em reais.",
      "Em crédito, compare o custo total, taxas e prazo. Parcelas pequenas não garantem compra mais barata; somar as parcelas e verificar encargos revela o compromisso final.",
    ],
    example: "R$ 100 a 10% ao ano, por dois anos: R$ 120 em juros simples e R$ 121 em compostos.",
    takeaway: "Identifique base, taxa, período e regime antes de calcular.",
    terms: [
      [
        "A taxa incide em cada período apenas sobre o capital inicial. Qual regime?",
        "Juros simples",
        "A base de cálculo permanece o capital inicial.",
      ],
      [
        "A taxa incide sobre o saldo já acrescido de juros. Qual regime?",
        "Juros compostos",
        "Há capitalização do saldo em cada período.",
      ],
      [
        "O aumento geral de preços reduz o que uma quantia consegue comprar. Trata-se de:",
        "Inflação",
        "Inflação é variação do nível geral de preços.",
      ],
      [
        "Uma aplicação rende 8%, mas os preços sobem 5%. A comparação relevante para consumo é o:",
        "Ganho real",
        "O ganho real desconta o efeito da inflação.",
      ],
      [
        "O valor inicial aplicado ou emprestado recebe o nome de:",
        "Capital",
        "Capital é a base inicial da operação financeira.",
      ],
    ],
  },
  {
    id: "graficos",
    subject: "matematica",
    title: "Leitura de dados e gráficos",
    subtitle: "Eixos, escala e comparação",
    minutes: 20,
    paragraphs: [
      "Um gráfico deve ser lido a partir do título, da legenda, dos eixos, da unidade e do intervalo observado. Escalas truncadas podem exagerar visualmente diferenças pequenas.",
      "Gráficos de linhas evidenciam evolução ao longo do tempo; barras ajudam a comparar categorias; setores representam partes de um total, desde que o todo esteja definido.",
      "Correlação indica que duas variáveis mudam juntas, mas não prova causalidade. Procure tamanho de amostra, fonte e explicações alternativas antes de concluir.",
    ],
    example: "Se vendas sobem de 100 para 110, o aumento é de 10%, ainda que o eixo comece em 99.",
    takeaway: "Leia números e unidades antes de interpretar o desenho.",
    terms: [
      [
        "O eixo vertical começa em 98, fazendo 100 e 102 parecerem muito distantes. O efeito é de:",
        "Escala truncada",
        "O recorte do eixo amplia a diferença visual.",
      ],
      [
        "Um gráfico acompanha a temperatura hora a hora. O formato mais direto é:",
        "Gráfico de linhas",
        "Linhas mostram continuidade e variação temporal.",
      ],
      [
        "Um gráfico compara matrículas de quatro escolas em um ano. O formato mais direto é:",
        "Gráfico de barras",
        "Barras facilitam a comparação entre categorias.",
      ],
      [
        "Duas séries crescem juntas, mas não há demonstração de causa. Há apenas:",
        "Correlação",
        "Variação conjunta não demonstra relação causal.",
      ],
      [
        "Uma fatia corresponde a 25% de todos os entrevistados. A representação é um:",
        "Gráfico de setores",
        "Setores mostram partes de um todo definido.",
      ],
    ],
  },
  {
    id: "argumentacao",
    subject: "linguagens",
    title: "Argumentação e persuasão",
    subtitle: "Tese, evidência e estratégia",
    minutes: 25,
    paragraphs: [
      "A tese é a posição defendida pelo autor. Argumentos são razões que procuram sustentá-la; dados, exemplos e comparações funcionam como evidências quando pertinentes e verificáveis.",
      "A força de uma argumentação depende da relação entre premissas e conclusão. Um exemplo isolado não prova uma regra universal. Recursos emotivos podem persuadir, mas não substituem evidências.",
      "Leia também o público-alvo e o meio de circulação. Uma campanha pode combinar imagem, slogan e chamada para ação; o efeito depende da integração dos recursos verbais e não verbais.",
    ],
    example:
      "'Amplie a biblioteca: 70% dos alunos consultados pediram mais horários' combina tese e dado de apoio.",
    takeaway: "Separe posição defendida, razões e provas apresentadas.",
    terms: [
      [
        "A posição central que um artigo procura defender é sua:",
        "Tese",
        "Tese é a proposição principal defendida.",
      ],
      [
        "Uma razão apresentada para sustentar uma posição é um:",
        "Argumento",
        "Argumentos ligam razões à tese.",
      ],
      [
        "Uma pesquisa verificável usada para apoiar uma afirmação funciona como:",
        "Evidência",
        "Dados pertinentes podem sustentar o argumento.",
      ],
      [
        "Um anúncio pede ao leitor que se inscreva hoje. Esse pedido é uma:",
        "Chamada para ação",
        "O texto solicita uma resposta prática do público.",
      ],
      [
        "O grupo para quem uma campanha foi planejada é seu:",
        "Público-alvo",
        "A escolha de linguagem e meio depende dos destinatários.",
      ],
    ],
  },
  {
    id: "figuras-linguagem",
    subject: "linguagens",
    title: "Sentidos e figuras de linguagem",
    subtitle: "Recursos expressivos em contexto",
    minutes: 20,
    paragraphs: [
      "Uma palavra pode ter sentido literal ou figurado conforme o contexto. Em textos literários e publicitários, figuras de linguagem intensificam imagens e avaliações.",
      "Metáfora aproxima ideias sem conectivo comparativo explícito; comparação marca a aproximação; personificação atribui características humanas a seres não humanos. Ironia sugere sentido diferente do literal.",
      "Nomear a figura só ajuda quando você explica o efeito de sentido. Pergunte o que a escolha faz com a interpretação do leitor.",
    ],
    example: "'A cidade acordou' personifica a cidade e sugere o início da atividade urbana.",
    takeaway: "Identifique a figura e explique seu efeito no texto.",
    terms: [
      [
        "'A esperança é uma janela' aproxima ideias sem 'como'. Qual recurso?",
        "Metáfora",
        "A aproximação figurada é direta.",
      ],
      [
        "'Rápido como o vento' usa conectivo explícito. Qual recurso?",
        "Comparação",
        "O conectivo marca a relação comparativa.",
      ],
      [
        "'O relógio reclamou da demora' atribui ação humana ao objeto. Qual recurso?",
        "Personificação",
        "O objeto recebe comportamento humano.",
      ],
      [
        "Alguém diz 'que pontualidade!' a quem chegou muito atrasado. Qual recurso?",
        "Ironia",
        "O sentido pretendido contrasta com o literal.",
      ],
      [
        "Uma expressão usada em seu significado direto, sem deslocamento, tem sentido:",
        "Literal",
        "O sentido literal é o significado direto no contexto.",
      ],
    ],
  },
  {
    id: "literatura",
    subject: "linguagens",
    title: "Literatura e contexto",
    subtitle: "Narrador, eu lírico e movimentos",
    minutes: 25,
    paragraphs: [
      "Textos literários organizam linguagem para produzir efeitos estéticos e reflexões sobre o mundo. A obra dialoga com seu período, mas não se reduz a um espelho simples dos acontecimentos.",
      "Narrador é a voz que conta a história; autor é a pessoa que a escreveu. Na poesia, eu lírico é a voz construída no poema. Confundir essas instâncias pode distorcer a interpretação.",
      "Estude características de movimentos literários com textos concretos. Realismo, modernismo e romantismo são categorias históricas úteis, mas cada obra combina escolhas próprias.",
    ],
    example:
      "Um romance narrado em primeira pessoa pode apresentar uma voz fictícia diferente do autor real.",
    takeaway: "Separe autor, narrador e voz poética.",
    terms: [
      [
        "A voz que relata os acontecimentos de um conto é o:",
        "Narrador",
        "É uma instância criada para contar a história.",
      ],
      [
        "A voz que se expressa em um poema, sem equivaler automaticamente ao poeta, é o:",
        "Eu lírico",
        "O eu lírico é construído no texto poético.",
      ],
      [
        "A pessoa real responsável pela produção de uma obra é o:",
        "Autor",
        "Autor e voz do texto não são necessariamente a mesma pessoa.",
      ],
      [
        "A relação entre uma obra e seu tempo de produção constitui seu:",
        "Contexto histórico",
        "O contexto ajuda a compreender valores e debates da época.",
      ],
      [
        "Um conjunto histórico de tendências estéticas compartilhadas por obras é um:",
        "Movimento literário",
        "Movimentos agrupam tendências sem apagar particularidades.",
      ],
    ],
  },
  {
    id: "ingles-leitura",
    subject: "linguagens",
    title: "Inglês instrumental",
    subtitle: "Pistas de leitura em língua estrangeira",
    minutes: 20,
    paragraphs: [
      "Na leitura em inglês, comece pelo título, imagens, palavras conhecidas e propósito do texto. Não é preciso traduzir cada palavra para localizar a ideia central.",
      "Cognatos podem ajudar, mas falsos cognatos exigem contexto: 'actually' costuma significar 'na verdade', e não 'atualmente'. Observe conectores como 'however' e 'because'.",
      "Skimming é leitura rápida para captar tema; scanning é busca de informação específica. Volte ao trecho exato antes de marcar a alternativa.",
    ],
    example:
      "Num aviso 'Free admission on Sundays', a informação-chave é entrada gratuita aos domingos.",
    takeaway: "Combine pistas do contexto com o objetivo da pergunta.",
    terms: [
      [
        "Ler rapidamente para captar o assunto geral é:",
        "Skimming",
        "Skimming busca a ideia global.",
      ],
      [
        "Procurar num cartaz apenas horário e endereço é:",
        "Scanning",
        "Scanning localiza informação específica.",
      ],
      [
        "A palavra 'however' costuma indicar:",
        "Contraste",
        "O conector introduz oposição ou ressalva.",
      ],
      [
        "Em muitos contextos, 'actually' quer dizer:",
        "Na verdade",
        "É um falso cognato frequente em relação a 'atualmente'.",
      ],
      [
        "Em 'because it rained', 'because' introduz uma:",
        "Causa",
        "O conector apresenta o motivo.",
      ],
    ],
  },
  {
    id: "artes-midia",
    subject: "linguagens",
    title: "Arte, mídia e cultura",
    subtitle: "Patrimônio e linguagens visuais",
    minutes: 20,
    paragraphs: [
      "A arte circula em suportes e contextos diversos: museu, rua, cinema, plataforma digital. Sua interpretação considera material, forma, público e contexto de produção.",
      "Patrimônio material inclui objetos e edificações; patrimônio imaterial inclui práticas, saberes e celebrações. Preservar envolve comunidades e sentidos atribuídos aos bens.",
      "Uma peça multimodal combina recursos verbais, visuais e sonoros. Ao analisar publicidade, investigue escolhas de enquadramento, cor, legenda e público-alvo.",
    ],
    example:
      "Uma festa tradicional pode ser patrimônio imaterial, enquanto seu edifício histórico é material.",
    takeaway: "Observe suporte, contexto e escolhas de linguagem.",
    terms: [
      [
        "Um prédio histórico preservado é exemplo de patrimônio:",
        "Material",
        "Trata-se de um bem físico.",
      ],
      [
        "Um saber tradicional transmitido entre gerações é patrimônio:",
        "Imaterial",
        "Práticas e conhecimentos integram o patrimônio imaterial.",
      ],
      [
        "Um anúncio que integra imagem, frase e som é:",
        "Multimodal",
        "Combina diferentes modos de significação.",
      ],
      [
        "A seleção do que aparece dentro dos limites da imagem é o:",
        "Enquadramento",
        "O enquadramento orienta o olhar do público.",
      ],
      [
        "O meio pelo qual uma obra chega ao público, como mural ou tela, é o:",
        "Suporte",
        "O suporte influencia circulação e experiência da obra.",
      ],
    ],
  },
  {
    id: "celulas",
    subject: "natureza",
    title: "Células e metabolismo",
    subtitle: "Estruturas e funções essenciais",
    minutes: 25,
    paragraphs: [
      "A célula é unidade básica dos seres vivos. A membrana delimita a célula e controla trocas; o material genético orienta processos celulares. Células eucarióticas têm núcleo delimitado por membrana.",
      "Mitocôndrias participam da respiração celular, liberando energia utilizável a partir de moléculas orgânicas. Cloroplastos realizam fotossíntese em plantas e algas.",
      "Não confunda respiração celular com ventilação pulmonar. Plantas também respiram; a fotossíntese utiliza luz para formar moléculas orgânicas e não substitui o metabolismo energético.",
    ],
    example:
      "Uma folha iluminada pode fazer fotossíntese e, ao mesmo tempo, manter respiração celular.",
    takeaway:
      "Associe cada estrutura a seu processo, sem tratar plantas como exceção à respiração.",
    terms: [
      [
        "A estrutura que delimita a célula e regula trocas é a:",
        "Membrana plasmática",
        "Ela controla a entrada e a saída de substâncias.",
      ],
      [
        "A organela ligada à respiração celular em eucariontes é a:",
        "Mitocôndria",
        "Nela ocorrem etapas centrais da produção de ATP.",
      ],
      [
        "A organela que capta luz para a fotossíntese é o:",
        "Cloroplasto",
        "Cloroplastos contêm pigmentos fotossintetizantes.",
      ],
      [
        "A região delimitada que abriga o DNA em células eucarióticas é o:",
        "Núcleo",
        "O núcleo separa o material genético do citoplasma.",
      ],
      [
        "A molécula que armazena informação hereditária é o:",
        "DNA",
        "Sua sequência contém informação genética.",
      ],
    ],
  },
  {
    id: "genetica",
    subject: "natureza",
    title: "Genética básica",
    subtitle: "Genes, alelos e herança",
    minutes: 25,
    paragraphs: [
      "Gene é um segmento de DNA associado à produção de um produto funcional. Alelos são variantes de um mesmo gene. O genótipo reúne informações genéticas; o fenótipo resulta da interação entre genes e ambiente.",
      "Na meiose, formam-se gametas com metade do número de cromossomos. A fecundação reúne material genético de dois gametas. Modelos mendelianos simples ajudam a prever probabilidades, mas muitas características são mais complexas.",
      "Dominante não significa mais comum nem 'melhor'. Um alelo dominante pode se manifestar em heterozigose; sempre verifique o modelo informado no enunciado.",
    ],
    example: "Em Aa, se A é dominante no modelo dado, o fenótipo associado a A se manifesta.",
    takeaway: "Diferencie gene, alelo, genótipo e fenótipo.",
    terms: [
      [
        "Uma variante de um mesmo gene, representada por A ou a, é um:",
        "Alelo",
        "Alelos são versões de um gene.",
      ],
      [
        "A combinação Aa de um indivíduo constitui seu:",
        "Genótipo",
        "Genótipo descreve a constituição genética no locus considerado.",
      ],
      [
        "A característica observável resultante de genes e ambiente é o:",
        "Fenótipo",
        "A expressão observada depende de mais que a sequência genética.",
      ],
      [
        "A divisão que reduz à metade o número de cromossomos na formação de gametas é:",
        "Meiose",
        "A meiose produz células haploides.",
      ],
      [
        "A união de dois gametas que restaura o número cromossômico é:",
        "Fecundação",
        "Os gametas se unem para formar o zigoto.",
      ],
    ],
  },
  {
    id: "quimica-geral",
    subject: "natureza",
    title: "Matéria e transformações",
    subtitle: "Átomos, misturas e reações",
    minutes: 25,
    paragraphs: [
      "Substância pura tem composição definida; mistura reúne substâncias. Misturas homogêneas apresentam uma fase visível; heterogêneas apresentam mais de uma fase.",
      "Transformação física não forma novas substâncias; transformação química envolve rearranjo de átomos e formação de produtos. O balanceamento conserva o número de átomos de cada elemento.",
      "Métodos de separação dependem de propriedades, como tamanho de partícula, densidade e ponto de ebulição. Descreva o sistema antes de escolher filtração, decantação ou destilação.",
    ],
    example: "Água e areia formam mistura heterogênea que pode ser separada por filtração.",
    takeaway: "Observe fases e propriedades antes de classificar ou separar.",
    terms: [
      [
        "Água e sal dissolvido apresentam uma única fase visível. O sistema é uma:",
        "Mistura homogênea",
        "Há uniformidade visual em uma fase.",
      ],
      [
        "Água e óleo formam duas fases. O sistema é uma:",
        "Mistura heterogênea",
        "São observadas fases distintas.",
      ],
      [
        "Separar sólido insolúvel de líquido com um filtro é:",
        "Filtração",
        "O filtro retém partículas sólidas.",
      ],
      [
        "Separar líquidos com pontos de ebulição distintos por vaporização e condensação é:",
        "Destilação",
        "A separação usa diferença de volatilidade.",
      ],
      [
        "Ferrugem forma novas substâncias a partir do ferro. É uma:",
        "Transformação química",
        "Há alteração da composição química.",
      ],
    ],
  },
  {
    id: "fisica-movimento",
    subject: "natureza",
    title: "Movimento e forças",
    subtitle: "Velocidade, aceleração e inércia",
    minutes: 25,
    paragraphs: [
      "Velocidade média relaciona deslocamento e intervalo de tempo; rapidez média usa distância total. Uma ida e volta pode ter deslocamento zero, mesmo com distância percorrida positiva.",
      "Aceleração é a variação da velocidade no tempo. Força resultante não nula altera o estado de movimento; na ausência de força resultante, um corpo mantém repouso ou movimento retilíneo uniforme.",
      "Em gráficos posição × tempo, a inclinação indica velocidade; em velocidade × tempo, a inclinação indica aceleração. Leia a unidade de cada eixo.",
    ],
    example: "Um ciclista percorre 30 km em 2 h: rapidez média de 15 km/h.",
    takeaway: "Diferencie deslocamento de distância e confira as unidades.",
    terms: [
      [
        "A distância total dividida pelo tempo total fornece a:",
        "Rapidez média",
        "Rapidez usa distância percorrida.",
      ],
      [
        "A posição final menos a inicial constitui o:",
        "Deslocamento",
        "Depende apenas das posições inicial e final.",
      ],
      [
        "A variação da velocidade por unidade de tempo é a:",
        "Aceleração",
        "Aceleração mede como a velocidade muda.",
      ],
      [
        "A tendência de manter o estado de movimento na ausência de força resultante é a:",
        "Inércia",
        "É a propriedade descrita pela primeira lei de Newton.",
      ],
      [
        "A soma vetorial de todas as forças sobre um corpo é a:",
        "Força resultante",
        "É ela que determina a aceleração resultante.",
      ],
    ],
  },
  {
    id: "eletricidade",
    subject: "natureza",
    title: "Eletricidade cotidiana",
    subtitle: "Tensão, corrente, potência e consumo",
    minutes: 25,
    paragraphs: [
      "Tensão elétrica é diferença de potencial; corrente é fluxo de carga por tempo. Resistência relaciona tensão e corrente em componentes ôhmicos: U = Ri.",
      "Potência elétrica indica ritmo de transformação de energia: P = Ui. O consumo cobrado em kWh resulta de potência em kW multiplicada pelo tempo em horas.",
      "Dispositivos de segurança protegem contra sobrecorrente. Ao comparar aparelhos, use potência e tempo de uso; a tensão nominal sozinha não determina gasto.",
    ],
    example: "Um aparelho de 1 kW usado por 2 h consome 2 kWh.",
    takeaway: "Separe potência instantânea de energia acumulada.",
    terms: [
      [
        "A diferença de potencial medida em volts é a:",
        "Tensão",
        "Tensão representa a diferença de potencial elétrico.",
      ],
      [
        "O fluxo de carga medido em ampères é a:",
        "Corrente",
        "Corrente é carga por intervalo de tempo.",
      ],
      [
        "A oposição à passagem de corrente, medida em ohms, é a:",
        "Resistência",
        "Resistência relaciona tensão e corrente em componentes ôhmicos.",
      ],
      [
        "A taxa de transformação de energia, medida em watts, é a:",
        "Potência",
        "Potência é energia por tempo.",
      ],
      [
        "A grandeza acumulada na conta de luz, usualmente em kWh, é a:",
        "Energia consumida",
        "Consumo depende de potência e duração de uso.",
      ],
    ],
  },
  {
    id: "brasil-colonial",
    subject: "humanas",
    title: "Brasil colonial",
    subtitle: "Trabalho, economia e resistência",
    minutes: 25,
    paragraphs: [
      "A colonização portuguesa articulou exploração econômica, ocupação territorial e poder político. A produção açucareira utilizou grandes propriedades e trabalho escravizado.",
      "Povos indígenas e africanos não foram sujeitos passivos: resistiram, negociaram e mantiveram práticas culturais. Quilombos foram uma das formas de resistência à escravidão.",
      "Ao estudar o período, relacione economia atlântica, instituições coloniais e efeitos sobre populações locais. Evite tratar toda a colônia como experiência uniforme.",
    ],
    example:
      "Um engenho articulava produção de açúcar e trabalho compulsório em uma rede comercial atlântica.",
    takeaway: "Analise economia e resistência sem apagar a diversidade regional.",
    terms: [
      [
        "A grande propriedade rural voltada a um produto de exportação é associada ao:",
        "Latifúndio",
        "A estrutura concentrava terra e produção.",
      ],
      [
        "A produção de açúcar em larga escala ocorria no:",
        "Engenho",
        "O engenho reunia instalações e trabalho para a produção açucareira.",
      ],
      [
        "Uma comunidade de resistência à escravidão formada por pessoas fugidas era um:",
        "Quilombo",
        "Quilombos reuniam resistência e organização social.",
      ],
      [
        "A circulação de mercadorias e pessoas entre continentes pelo oceano integrava a:",
        "Economia atlântica",
        "A produção colonial se ligava a redes transoceânicas.",
      ],
      [
        "O trabalho imposto sob coerção e sem liberdade pessoal era:",
        "Trabalho escravizado",
        "A escravidão retirava a liberdade e explorava o trabalho.",
      ],
    ],
  },
  {
    id: "brasil-republica",
    subject: "humanas",
    title: "República e democracia",
    subtitle: "Cidadania e participação política",
    minutes: 25,
    paragraphs: [
      "A história republicana brasileira inclui disputas por representação, direitos e participação. Regimes democráticos dependem de eleições e também de garantias, instituições e controle do poder.",
      "Direitos políticos permitem participação nas decisões coletivas; direitos sociais buscam condições materiais de vida. A ampliação formal de direitos não elimina automaticamente barreiras de acesso.",
      "Ao interpretar uma fonte histórica, identifique autoria, data, público e finalidade. Uma propaganda oficial expressa uma perspectiva e deve ser confrontada com outras fontes.",
    ],
    example:
      "Uma manchete de época pode indicar opinião editorial, não retrato neutro de todo o país.",
    takeaway: "Leia fontes com atenção à autoria e ao contexto.",
    terms: [
      [
        "A escolha periódica de representantes pelo voto é uma:",
        "Eleição",
        "O voto compõe a representação política.",
      ],
      [
        "A possibilidade de participar da vida política, como votar, integra os:",
        "Direitos políticos",
        "Esses direitos viabilizam participação no poder.",
      ],
      [
        "Educação e saúde como garantias coletivas integram os:",
        "Direitos sociais",
        "Visam condições para uma vida digna.",
      ],
      [
        "Um documento produzido em determinada época e analisado para compreendê-la é uma:",
        "Fonte histórica",
        "Fontes são vestígios situados de processos passados.",
      ],
      [
        "A divisão de competências entre instituições para limitar concentração de poder é:",
        "Separação de poderes",
        "A separação cria freios institucionais.",
      ],
    ],
  },
  {
    id: "clima-cartografia",
    subject: "humanas",
    title: "Clima e cartografia",
    subtitle: "Escalas, mapas e fenômenos",
    minutes: 25,
    paragraphs: [
      "Tempo atmosférico descreve condições em um momento; clima reúne padrões observados durante períodos longos. Uma chuva hoje não define, por si, o clima de uma região.",
      "Mapas utilizam escala para relacionar distância representada e distância real. A legenda explica símbolos; orientação e coordenadas ajudam a localizar posições.",
      "Interprete mapas temáticos com título, data, fonte e método. A escolha de classes e cores pode alterar a percepção de desigualdades e distribuições.",
    ],
    example: "Na escala 1:100.000, 1 cm no mapa representa 1 km no terreno.",
    takeaway: "Separe fenômenos atmosféricos de sua representação cartográfica.",
    terms: [
      [
        "A condição atmosférica observada hoje é o:",
        "Tempo atmosférico",
        "Tempo se refere ao estado momentâneo da atmosfera.",
      ],
      [
        "O padrão de condições atmosféricas de longo prazo é o:",
        "Clima",
        "Clima envolve séries longas e regularidades.",
      ],
      [
        "A relação numérica entre distância no mapa e distância real é a:",
        "Escala cartográfica",
        "Ela permite converter medidas do mapa.",
      ],
      [
        "O quadro que explica cores e símbolos de um mapa é a:",
        "Legenda",
        "A legenda informa o significado dos sinais.",
      ],
      [
        "Um mapa que representa a distribuição de renda por município é:",
        "Mapa temático",
        "Representa uma variável sobre o território.",
      ],
    ],
  },
  {
    id: "sociologia",
    subject: "humanas",
    title: "Sociedade e cultura",
    subtitle: "Socialização, desigualdade e Estado",
    minutes: 25,
    paragraphs: [
      "Socialização é o aprendizado de normas e práticas na convivência. Cultura inclui conhecimentos, valores, linguagens e modos de vida, sem hierarquia natural entre grupos.",
      "Desigualdade social envolve distribuição desigual de recursos e oportunidades. Mobilidade social descreve mudanças de posição; sua existência não prova que todos tenham as mesmas chances.",
      "O Estado cria e executa políticas públicas por meio de instituições. Uma política deve ser analisada por objetivo, público, recursos e resultados, não só pela intenção anunciada.",
    ],
    example:
      "Uma escola pública pode ampliar oportunidades, mas seus resultados dependem de acesso e condições concretas.",
    takeaway: "Distinga conceitos sociais de juízos de valor sobre grupos.",
    terms: [
      [
        "Aprender regras de convivência na família, escola e comunidade é:",
        "Socialização",
        "A socialização transmite e transforma normas.",
      ],
      [
        "Práticas, valores e saberes partilhados por grupos compõem a:",
        "Cultura",
        "Cultura abrange modos de vida e significados.",
      ],
      [
        "Diferenças persistentes de acesso a renda e serviços caracterizam:",
        "Desigualdade social",
        "Há distribuição desigual de recursos e oportunidades.",
      ],
      [
        "A mudança de posição socioeconômica entre gerações é:",
        "Mobilidade social",
        "Mobilidade descreve deslocamento entre posições sociais.",
      ],
      [
        "Uma ação organizada do poder público para enfrentar um problema coletivo é:",
        "Política pública",
        "Políticas mobilizam decisões e recursos públicos.",
      ],
    ],
  },
  {
    id: "regencia-crase",
    subject: "portugues",
    title: "Regência e crase",
    subtitle: "Relações entre termos e uso do acento",
    minutes: 25,
    paragraphs: [
      "Regência estuda a relação entre um termo e seu complemento. Alguns verbos exigem preposição, outros não; a escolha também pode variar conforme o sentido do verbo.",
      "A crase marca a fusão da preposição a com o artigo a ou com início a de certos demonstrativos. Um teste útil é substituir a palavra feminina por masculina: se aparecer 'ao', pode haver crase no correspondente feminino.",
      "Não há crase diante de verbo no infinitivo. Decore menos listas isoladas e examine a exigência do termo anterior e a possibilidade de artigo no termo seguinte.",
    ],
    example: "'Dirigiu-se à escola' corresponde a 'dirigiu-se ao colégio'.",
    takeaway: "Para analisar crase, verifique preposição e artigo separadamente.",
    terms: [
      [
        "A relação que determina se um verbo pede preposição chama-se:",
        "Regência verbal",
        "Trata da ligação entre verbo e complemento.",
      ],
      [
        "O acento em 'à escola' indica fusão de preposição e artigo chamada:",
        "Crase",
        "Há encontro de a + a.",
      ],
      [
        "Em 'precisa de apoio', a palavra 'de' é uma:",
        "Preposição",
        "A preposição liga o verbo ao complemento.",
      ],
      [
        "Em 'a escola fechou', o 'a' que acompanha o substantivo é:",
        "Artigo",
        "Determina o substantivo feminino.",
      ],
      [
        "Em 'começou a estudar', 'estudar' está no:",
        "Infinitivo",
        "O verbo no infinitivo não admite artigo feminino antes dele.",
      ],
    ],
  },
  {
    id: "pontuacao",
    subject: "portugues",
    title: "Pontuação e sentido",
    subtitle: "Vírgula, enumeração e inserções",
    minutes: 20,
    paragraphs: [
      "Pontuação organiza relações sintáticas e efeitos de sentido. A vírgula pode separar itens de enumeração ou isolar um vocativo, mas não deve separar sujeito e verbo apenas porque a frase é longa.",
      "Expressões explicativas e adjuntos deslocados podem ser destacados por vírgulas conforme a estrutura. Dois-pontos podem introduzir explicação ou enumeração.",
      "Leia a frase em seu contexto. Alterar a posição de uma vírgula pode mudar a referência e o sentido; a decisão precisa seguir a organização sintática, não só uma pausa na fala.",
    ],
    example: "'Vamos comer, Ana' chama Ana; 'Vamos comer Ana' altera radicalmente o sentido.",
    takeaway: "Justifique cada sinal pela estrutura e pelo efeito de sentido.",
    terms: [
      [
        "Em 'Pedro, venha aqui', o nome que chama o interlocutor é um:",
        "Vocativo",
        "O vocativo é isolado por vírgula.",
      ],
      [
        "Em 'comprei pão, leite e frutas', há uma:",
        "Enumeração",
        "A vírgula separa elementos da lista.",
      ],
      [
        "O sinal que pode introduzir uma explicação ou lista é:",
        "Dois-pontos",
        "Anuncia desenvolvimento do segmento anterior.",
      ],
      [
        "A vírgula entre o sujeito e o verbo, sem termo intercalado, é uma:",
        "Separação indevida",
        "Sujeito e verbo não se separam por simples pausa.",
      ],
      [
        "Em 'A equipe, segundo o relatório, cresceu', o trecho entre vírgulas é uma:",
        "Intercalação",
        "O segmento inserido interrompe a estrutura principal.",
      ],
    ],
  },
  {
    id: "pernambuco-republicano",
    subject: "historia-pe",
    title: "Pernambuco republicano",
    subtitle: "Mudanças sociais e memória",
    minutes: 25,
    paragraphs: [
      "A República trouxe novas formas institucionais, mas não eliminou desigualdades herdadas da escravidão. Em Pernambuco, a urbanização do Recife e a economia canavieira conviveram com diferentes experiências sociais.",
      "Movimentos de trabalhadores, estudantes e moradores disputaram direitos e espaços públicos. Documentos oficiais, imprensa e relatos pessoais oferecem perspectivas parciais e complementares.",
      "Ao comparar fontes, observe quem fala, quem é silenciado e a data do registro. A memória urbana inclui tanto edifícios quanto práticas culturais vivas.",
    ],
    example: "Uma reforma urbana pode modernizar vias e, ao mesmo tempo, deslocar moradores.",
    takeaway: "Analise permanências, mudanças e sujeitos sociais.",
    terms: [
      [
        "O crescimento das cidades e da população urbana é:",
        "Urbanização",
        "Refere-se à ampliação da vida urbana.",
      ],
      [
        "A continuidade de estruturas antigas apesar de mudanças políticas é uma:",
        "Permanência",
        "Nem toda transformação institucional altera imediatamente a sociedade.",
      ],
      [
        "Uma prática cultural transmitida por grupos e comunidades integra a:",
        "Memória social",
        "Memórias coletivas preservam interpretações do passado.",
      ],
      [
        "Comparar jornais e depoimentos de uma época é fazer:",
        "Análise de fontes",
        "Fontes diferentes precisam ser situadas e confrontadas.",
      ],
      [
        "A organização coletiva de pessoas para reivindicar direitos é um:",
        "Movimento social",
        "A ação coletiva busca mudança ou reconhecimento.",
      ],
    ],
  },
  {
    id: "conjuntos",
    subject: "logica",
    title: "Conjuntos e diagramas",
    subtitle: "União, interseção e complemento",
    minutes: 20,
    paragraphs: [
      "Um conjunto reúne elementos definidos por uma condição. A união A∪B inclui quem pertence a pelo menos um dos conjuntos; a interseção A∩B inclui quem pertence aos dois.",
      "O complemento de A, em um universo definido, reúne elementos que não pertencem a A. Em problemas de contagem, |A∪B| = |A| + |B| − |A∩B| para não contar duas vezes a interseção.",
      "Desenhe o diagrama e comece pela região comum. Confira se a pergunta inclui quem não pertence a nenhum dos grupos.",
    ],
    example: "Se 20 estudam A, 15 estudam B e 5 estudam ambos, 30 estudam ao menos um.",
    takeaway: "Subtraia a interseção ao contar a união.",
    terms: [
      [
        "Pessoas que estudam inglês ou espanhol, inclusive ambos, formam a:",
        "União",
        "A união admite pertencimento a pelo menos um conjunto.",
      ],
      [
        "Pessoas que estudam inglês e espanhol formam a:",
        "Interseção",
        "A interseção exige pertencimento aos dois conjuntos.",
      ],
      [
        "No universo dos inscritos, quem não estuda inglês pertence ao:",
        "Complemento",
        "O complemento reúne os elementos fora do conjunto.",
      ],
      [
        "Um desenho com círculos sobrepostos para representar grupos é um:",
        "Diagrama de Venn",
        "As regiões mostram relações entre conjuntos.",
      ],
      [
        "O grupo total de pessoas considerado no problema é o:",
        "Universo",
        "O universo delimita os elementos possíveis.",
      ],
    ],
  },
  {
    id: "sequencias",
    subject: "logica",
    title: "Padrões e sequências",
    subtitle: "Progressões e regularidades",
    minutes: 20,
    paragraphs: [
      "Uma sequência é uma lista ordenada de termos. Em progressão aritmética (PA), a diferença entre termos consecutivos é constante; em progressão geométrica (PG), a razão multiplicativa é constante.",
      "Para PA, a_n = a_1 + (n−1)r. Para PG, a_n = a_1 q^(n−1). Nem toda sequência segue uma dessas regras; confira vários termos antes de generalizar.",
      "Em questões de padrão, descreva a regra em palavras e teste-a nos dados. Se mais de uma regra servir, o enunciado precisa oferecer uma condição adicional.",
    ],
    example: "3, 7, 11, 15 é PA de razão 4; 3, 6, 12, 24 é PG de razão 2.",
    takeaway: "Identifique se a regularidade é aditiva ou multiplicativa.",
    terms: [
      [
        "Na sequência 4, 7, 10, 13, soma-se sempre 3. É uma:",
        "Progressão aritmética",
        "A diferença entre termos é constante.",
      ],
      [
        "Na sequência 2, 6, 18, 54, multiplica-se sempre por 3. É uma:",
        "Progressão geométrica",
        "A razão entre termos é constante.",
      ],
      [
        "O valor acrescentado de um termo ao próximo numa PA é a:",
        "Razão aditiva",
        "Na PA, r é a diferença constante.",
      ],
      [
        "O fator que multiplica um termo para obter o próximo numa PG é a:",
        "Razão multiplicativa",
        "Na PG, q é o quociente constante.",
      ],
      [
        "A posição ocupada por um valor numa lista ordenada é seu:",
        "Índice",
        "O índice identifica a ordem do termo.",
      ],
    ],
  },
  {
    id: "redes",
    subject: "informatica",
    title: "Internet e redes",
    subtitle: "Serviços, endereços e protocolos",
    minutes: 20,
    paragraphs: [
      "A internet conecta redes e permite serviços como Web, e-mail e troca de arquivos. Um navegador acessa páginas; um buscador ajuda a localizar conteúdo. Um não é sinônimo do outro.",
      "URL identifica um recurso na Web. DNS traduz nomes de domínio em endereços IP. HTTPS usa conexão protegida, mas a presença do cadeado não garante que o conteúdo ou o vendedor seja confiável.",
      "Em segurança, verifique domínio completo e origem da mensagem. Links encurtados e páginas imitadas exigem cautela; confirme informações por canais oficiais.",
    ],
    example: "Em https://exemplo.org/guia, 'exemplo.org' é o domínio e '/guia' indica um caminho.",
    takeaway: "Diferencie serviço, aplicativo, endereço e proteção da conexão.",
    terms: [
      [
        "O programa usado para abrir páginas na Web é um:",
        "Navegador",
        "O navegador interpreta e apresenta páginas.",
      ],
      [
        "A ferramenta que indexa páginas para localizar informações é um:",
        "Buscador",
        "Buscadores ajudam a encontrar conteúdos.",
      ],
      ["O endereço de um recurso na Web é uma:", "URL", "A URL indica como localizar um recurso."],
      [
        "O sistema que traduz nomes de domínio em endereços IP é o:",
        "DNS",
        "O DNS resolve nomes para endereços de rede.",
      ],
      [
        "A variante do protocolo Web que protege a conexão por criptografia é:",
        "HTTPS",
        "HTTPS protege o tráfego entre navegador e servidor.",
      ],
    ],
  },
  {
    id: "backup-dados",
    subject: "informatica",
    title: "Dados e proteção digital",
    subtitle: "Backup, autenticação e golpes",
    minutes: 20,
    paragraphs: [
      "Backup é uma cópia de segurança recuperável em caso de perda. Uma sincronização que apaga arquivos em todos os dispositivos não substitui necessariamente uma cópia independente.",
      "Autenticação multifator adiciona uma segunda prova de identidade. Senhas únicas e gerenciadores reduzem o impacto do vazamento de uma conta.",
      "Phishing usa mensagens e páginas falsas para obter dados. Antes de clicar, verifique remetente, domínio e solicitação; urgência exagerada é um sinal de alerta.",
    ],
    example:
      "Guardar uma cópia periódica offline permite recuperar documentos após falha ou ransomware.",
    takeaway: "Proteção envolve prevenção e capacidade de recuperação.",
    terms: [
      [
        "Uma cópia independente para recuperar arquivos perdidos é um:",
        "Backup",
        "Backup precisa permitir restauração.",
      ],
      [
        "Exigir senha e código de aplicativo no acesso é:",
        "Autenticação multifator",
        "São provas de identidade distintas.",
      ],
      [
        "Uma mensagem falsa que tenta obter sua senha pratica:",
        "Phishing",
        "O golpe imita uma fonte confiável.",
      ],
      [
        "Um programa que cifra arquivos e exige pagamento é:",
        "Ransomware",
        "Esse tipo de malware bloqueia o acesso aos dados.",
      ],
      [
        "Manter cópias idênticas entre dispositivos em tempo quase real é:",
        "Sincronização",
        "Ela replica alterações, inclusive exclusões.",
      ],
    ],
  },
  {
    id: "seguranca-publica-cf",
    subject: "constitucional",
    title: "Segurança pública na Constituição",
    subtitle: "Artigo 144 e funções institucionais",
    minutes: 25,
    source: "constitution",
    paragraphs: [
      "O art. 144 da Constituição dispõe que a segurança pública é dever do Estado, direito e responsabilidade de todos. O texto enumera órgãos e distribui funções, que devem ser lidas sem confusão entre investigação e policiamento ostensivo.",
      "Às polícias militares cabem a polícia ostensiva e a preservação da ordem pública. Às polícias civis, ressalvada a competência da União, cabem funções de polícia judiciária e apuração de infrações penais, exceto as militares.",
      "Corpos de bombeiros militares exercem, além de atribuições legais, atividades de defesa civil. Consulte a redação vigente do artigo antes de estudar detalhes de competências e organização.",
    ],
    example:
      "Patrulhamento ostensivo e investigação de infração penal comum são funções constitucionalmente distintas.",
    takeaway: "Associe cada órgão à função constitucional expressa.",
    terms: [
      [
        "Segundo o art. 144, o policiamento ostensivo cabe às:",
        "Polícias militares",
        "A Constituição lhes atribui polícia ostensiva e preservação da ordem pública.",
      ],
      [
        "A apuração de infrações penais comuns estaduais, ressalvadas exceções constitucionais, cabe às:",
        "Polícias civis",
        "A Constituição lhes atribui a investigação dessas infrações.",
      ],
      [
        "O órgão militar estadual que também exerce atividades de defesa civil é o:",
        "Corpo de bombeiros militar",
        "O art. 144 menciona suas atividades de defesa civil.",
      ],
      [
        "A proteção do patrimônio e serviços federais pela polícia judiciária da União relaciona-se à:",
        "Polícia Federal",
        "A PF exerce competências federais previstas no art. 144.",
      ],
      [
        "A atuação ostensiva nas rodovias federais cabe à:",
        "Polícia Rodoviária Federal",
        "A PRF realiza patrulhamento ostensivo das rodovias federais.",
      ],
    ],
  },
  {
    id: "igualdade-direitos",
    subject: "direitos-humanos",
    title: "Igualdade e não discriminação",
    subtitle: "Direitos universais e proteção concreta",
    minutes: 20,
    source: "rights",
    paragraphs: [
      "Direitos humanos são atribuídos a todas as pessoas por sua dignidade. Igualdade formal significa tratamento igual perante a norma; igualdade material observa barreiras reais e busca condições efetivas de exercício de direitos.",
      "Discriminação ocorre quando uma distinção injustificada prejudica pessoas ou grupos. A proteção de grupos vulnerabilizados procura remover obstáculos, não negar a universalidade dos direitos.",
      "No serviço público, respeito, proporcionalidade e atendimento sem discriminação orientam a atuação. Analise sempre o contexto e as normas aplicáveis.",
    ],
    example:
      "Oferecer atendimento acessível permite que uma pessoa com deficiência use o mesmo serviço público.",
    takeaway: "Igualdade exige atenção aos obstáculos concretos.",
    terms: [
      [
        "Tratar todas as pessoas como titulares dos mesmos direitos expressa a:",
        "Universalidade",
        "Os direitos pertencem a todas as pessoas.",
      ],
      [
        "A igualdade perante o texto da lei é chamada:",
        "Igualdade formal",
        "Refere-se ao plano normativo abstrato.",
      ],
      [
        "Remover barreiras para garantir acesso efetivo aos direitos busca a:",
        "Igualdade material",
        "Considera condições concretas de exercício.",
      ],
      [
        "Prejudicar alguém com base em característica pessoal sem justificativa legítima é:",
        "Discriminação",
        "Há tratamento desvantajoso injustificado.",
      ],
      [
        "Adaptar um serviço para uso por pessoas com deficiência promove:",
        "Acessibilidade",
        "Reduz barreiras ao uso autônomo e seguro.",
      ],
    ],
  },
  {
    id: "estatuto-pmpe",
    subject: "legislacao-pmpe",
    title: "Estatuto dos Policiais Militares de PE",
    subtitle: "Lei estadual 6.783/1974: noções fundamentais",
    minutes: 30,
    source: "estatuto",
    paragraphs: [
      "A Lei estadual 6.783/1974 regula situação, obrigações, deveres, direitos e prerrogativas dos policiais militares de Pernambuco. O estudo deve começar pelas disposições gerais e pela terminologia usada na norma.",
      "O Estatuto distingue militares na ativa e na inatividade. Na inatividade, reserva remunerada e reforma são situações diferentes. A redação atualizada e as alterações posteriores precisam ser consultadas para detalhes de cada hipótese.",
      "Ao resolver questões, localize o artigo correspondente e confira as condições expressas. Não transplante automaticamente regras de servidores civis ou de corporações de outros estados.",
    ],
    example:
      "Um militar reformado não é simplesmente sinônimo de integrante da reserva remunerada.",
    takeaway: "Comece pelo âmbito da lei e pelas situações funcionais previstas.",
    terms: [
      [
        "A lei 6.783/1974 recebe o nome de:",
        "Estatuto dos Policiais Militares",
        "A norma disciplina a situação e os direitos e deveres desses militares.",
      ],
      [
        "O conjunto que inclui militares de carreira em serviço é a:",
        "Ativa",
        "O Estatuto enumera as situações compreendidas na ativa.",
      ],
      [
        "A situação do militar inativo que pode estar sujeito a convocação é a:",
        "Reserva remunerada",
        "A reserva remunerada é distinta da reforma.",
      ],
      [
        "A situação do militar inativo dispensado definitivamente da prestação de serviço na ativa é a:",
        "Reforma",
        "O Estatuto diferencia o reformado do reservista.",
      ],
      [
        "Direitos, deveres e situação funcional previstos na Lei 6.783/1974 compõem o:",
        "Regime estatutário militar",
        "Essas matérias são o objeto central do Estatuto.",
      ],
    ],
  },
  {
    id: "codigo-disciplinar-pmpe",
    subject: "legislacao-pmpe",
    title: "Código Disciplinar de PE",
    subtitle: "Lei estadual 11.817/2000: estrutura e garantias",
    minutes: 30,
    source: "disciplina",
    paragraphs: [
      "A Lei estadual 11.817/2000 institui o regime disciplinar dos militares estaduais. Ela especifica e classifica transgressões, trata da aplicação de sanções, do comportamento das praças e de recursos disciplinares.",
      "A avaliação de uma conduta disciplinar exige verificar o tipo previsto, a gravidade, o procedimento e a autoridade competente. Uma sanção administrativa não é automaticamente pena criminal.",
      "O Código sofreu alterações. Para prazos, espécies de sanção e requisitos de recurso, leia o texto atualizado no portal oficial antes de memorizar valores. O estudo aqui fornece a estrutura conceitual.",
    ],
    example:
      "Uma infração disciplinar deve ser analisada pelo Código e por seu procedimento, não por analogia com uma opinião moral.",
    takeaway: "Distinga transgressão, sanção, classificação e recurso.",
    terms: [
      [
        "A conduta contrária ao dever disciplinar descrita na lei é uma:",
        "Transgressão disciplinar",
        "O Código especifica e classifica transgressões.",
      ],
      [
        "A consequência administrativa aplicada após o procedimento cabível é uma:",
        "Sanção disciplinar",
        "A sanção pertence ao regime administrativo disciplinar.",
      ],
      [
        "O mecanismo usado para questionar decisão disciplinar na forma da lei é um:",
        "Recurso disciplinar",
        "O Código prevê recursos e sua interposição.",
      ],
      [
        "A gradação da infração conforme sua natureza é a:",
        "Classificação da transgressão",
        "A lei diferencia transgressões por gravidade.",
      ],
      [
        "A avaliação funcional das praças regulada no Código é a:",
        "Classificação de comportamento",
        "O Código trata da classificação do comportamento das praças.",
      ],
    ],
  },
  {
    id: "organizacao-pmpe",
    subject: "legislacao-pmpe",
    title: "Organização básica da PMPE",
    subtitle: "Lei estadual 11.328/1996: missão e estrutura",
    minutes: 30,
    source: "organizacao",
    paragraphs: [
      "A Lei estadual 11.328/1996 organiza a PMPE com base em hierarquia e disciplina e estabelece sua destinação à polícia ostensiva e à preservação da ordem pública. A Corporação subordina-se diretamente ao Governador do Estado.",
      "A estrutura legal diferencia órgãos de direção, apoio e execução. Direção comanda e administra; apoio supre necessidades de pessoal e material; execução realiza a atividade-fim.",
      "A organização pode sofrer alterações legislativas. Consulte o texto atualizado para unidades, cargos e competências específicas; fixe primeiro a lógica dos três tipos de órgão.",
    ],
    example:
      "Uma unidade operacional voltada ao atendimento da missão institucional integra a atividade de execução.",
    takeaway: "Associe missão, subordinação e função de cada grupo de órgãos.",
    terms: [
      [
        "A missão de atuação policial visível ao público, prevista na Lei 11.328/1996, é a:",
        "Polícia ostensiva",
        "A lei a apresenta como destinação da PMPE.",
      ],
      [
        "O conjunto de órgãos que planeja, comanda e administra é o de:",
        "Direção",
        "A direção coordena e controla a Corporação.",
      ],
      [
        "O conjunto que supre necessidades de pessoal e material é o de:",
        "Apoio",
        "É a atividade-meio que sustenta a missão.",
      ],
      [
        "O conjunto que realiza a atividade-fim e missões operacionais é o de:",
        "Execução",
        "Os órgãos de execução cumprem as missões da Corporação.",
      ],
      [
        "Segundo a lei de organização, a PMPE subordina-se diretamente ao:",
        "Governador do Estado",
        "A subordinação direta consta da lei estadual.",
      ],
    ],
  },
  {
    id: "hierarquia-pmpe",
    subject: "legislacao-pmpe",
    title: "Hierarquia e disciplina na PMPE",
    subtitle: "Artigos 12 a 14 do Estatuto",
    minutes: 25,
    source: "estatuto",
    paragraphs: [
      "O art. 12 da Lei 6.783/1974 define hierarquia e disciplina como base institucional da PMPE. A autoridade e a responsabilidade crescem com o grau hierárquico.",
      "Hierarquia é a ordenação de autoridade em níveis. A ordenação ocorre por postos ou graduações; dentro do mesmo posto ou graduação, considera-se a antiguidade. Disciplina é a observância das leis, regulamentos e disposições que organizam o serviço.",
      "Os círculos hierárquicos, no art. 13, são âmbitos de convivência entre militares de uma mesma categoria e não eliminam o respeito mútuo. Na prova, distinga os três conceitos antes de aplicar a regra a um caso.",
    ],
    example:
      "Entre dois militares da mesma graduação, a antiguidade integra o critério de ordenação previsto no Estatuto.",
    takeaway: "Hierarquia ordena autoridade; disciplina orienta o cumprimento do dever.",
    terms: [
      [
        "A ordenação da autoridade em diferentes níveis da PMPE é a:",
        "Hierarquia",
        "O art. 12 define hierarquia como ordenação de autoridade.",
      ],
      [
        "A observância das normas e o cumprimento do dever expressam a:",
        "Disciplina",
        "Disciplina é a observância rigorosa das normas da Corporação.",
      ],
      [
        "O nível hierárquico atribuído aos oficiais é o:",
        "Posto",
        "Postos são os graus hierárquicos dos oficiais.",
      ],
      [
        "O nível hierárquico atribuído às praças é a:",
        "Graduação",
        "Graduações são os graus hierárquicos das praças.",
      ],
      [
        "Entre militares de mesmo posto ou graduação, a ordenação considera a:",
        "Antiguidade",
        "O Estatuto usa antiguidade dentro do mesmo grau.",
      ],
    ],
  },
  {
    id: "etica-pmpe",
    subject: "legislacao-pmpe",
    title: "Ética policial-militar",
    subtitle: "Valor, probidade e dignidade no Estatuto",
    minutes: 25,
    source: "estatuto",
    paragraphs: [
      "O Estatuto trata do valor policial-militar no art. 26 e da ética no art. 27. Servir à comunidade, aprimorar-se tecnicamente, agir com probidade e respeitar a dignidade humana aparecem entre as referências legais.",
      "Ética institucional não autoriza favorecer interesses privados. O art. 27 também exige justiça e imparcialidade na avaliação de subordinados e veda usar posto ou graduação para obter facilidades pessoais.",
      "Leia cada dever no texto atualizado da lei. Em questões situacionais, identifique qual princípio é concretamente afetado pela conduta, sem substituir o artigo por opinião pessoal.",
    ],
    example:
      "Usar a graduação para resolver negócio particular contraria preceito expresso do art. 27.",
    takeaway: "Relacione a conduta ao preceito legal específico.",
    terms: [
      [
        "Agir com honestidade no exercício da função corresponde à:",
        "Probidade",
        "O Estatuto inclui probidade entre os preceitos da função.",
      ],
      [
        "Avaliar subordinados sem favorecer pessoas exige:",
        "Imparcialidade",
        "O art. 27 prevê julgamento justo e imparcial.",
      ],
      [
        "Reconhecer o valor de cada pessoa no atendimento protege a:",
        "Dignidade humana",
        "Respeitar a dignidade da pessoa humana é preceito ético.",
      ],
      [
        "Estudar e aperfeiçoar as capacidades da profissão é:",
        "Aprimoramento técnico-profissional",
        "O art. 26 o inclui entre manifestações do valor policial-militar.",
      ],
      [
        "Evitar usar o posto para obter vantagem particular atende à vedação de:",
        "Facilidade pessoal",
        "O art. 27 veda o uso do posto ou graduação para esse fim.",
      ],
    ],
  },
  {
    id: "deveres-pmpe",
    subject: "legislacao-pmpe",
    title: "Deveres e comando",
    subtitle: "Artigos 30 a 39 do Estatuto",
    minutes: 25,
    source: "estatuto",
    paragraphs: [
      "O art. 30 do Estatuto reúne deveres como dedicação ao serviço, probidade, lealdade, disciplina e respeito à hierarquia. Também exige tratar o subordinado dignamente e com urbanidade.",
      "O compromisso de honra é prestado após o ingresso, na forma dos arts. 31 e 32. Comando, conforme o art. 33, reúne autoridade, deveres e responsabilidades atribuídos legalmente; não é privilégio pessoal.",
      "A subordinação decorre da estrutura hierarquizada e não afeta a dignidade pessoal. O art. 39 atribui ao militar responsabilidade pelas decisões que toma, ordens que emite e atos que pratica.",
    ],
    example:
      "Uma ordem emitida por autoridade competente também gera responsabilidade por seu conteúdo e por sua execução.",
    takeaway: "Comando combina autoridade e responsabilidade, preservando a dignidade de todos.",
    terms: [
      [
        "O ato solene em que o ingressante aceita conscientemente deveres é o:",
        "Compromisso de honra",
        "Os arts. 31 e 32 regulam o compromisso após o ingresso.",
      ],
      [
        "A soma legal de autoridade, deveres e responsabilidades na direção de pessoas é o:",
        "Comando",
        "Essa é a definição do art. 33.",
      ],
      [
        "A relação que decorre da estrutura hierárquica sem afetar a dignidade pessoal é a:",
        "Subordinação",
        "O art. 34 a distingue de diminuição pessoal.",
      ],
      [
        "O dever de tratar o subordinado com respeito e cortesia envolve a:",
        "Urbanidade",
        "O art. 30 exige tratamento digno e urbano.",
      ],
      [
        "Responder pelas decisões, ordens e atos próprios é uma:",
        "Responsabilidade pessoal",
        "O art. 39 atribui ao policial-militar responsabilidade integral por eles.",
      ],
    ],
  },
];

export const EXPANDED_LESSONS = EXPANDED_TOPICS.map(({ terms, ...lesson }) => lesson);

export const EXPANDED_QUESTIONS = EXPANDED_TOPICS.flatMap((topic) =>
  topic.terms.map(([stem, correct, explanation], itemIndex) => {
    const choices = topic.terms.map((entry) => entry[1]);
    const shift = (itemIndex * 2 + topic.id.length) % choices.length;
    const options = [...choices.slice(shift), ...choices.slice(0, shift)];
    return {
      id: `tello-c-${topic.id}-${itemIndex + 1}`,
      lessonId: topic.id,
      subject: topic.subject,
      track: ["matematica", "linguagens", "natureza", "humanas"].includes(topic.subject)
        ? "enem"
        : "pmpe",
      difficulty: itemIndex < 2 ? 1 : itemIndex < 4 ? 2 : 3,
      stem,
      options,
      answer: options.indexOf(correct),
      explanation,
      source: "Autoral · Tello",
      year: 2026,
    };
  }),
);
