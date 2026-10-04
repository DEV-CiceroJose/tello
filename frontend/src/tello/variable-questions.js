// Séries de aplicação: cada item tem contexto, dados e resolução próprios.
// Acrescentar um modelo ou uma variação não muda os identificadores existentes.
const money = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;
const decimal = (value) => Number(value.toFixed(2)).toString().replace(".", ",");

const models = [
  {
    id: "desconto",
    lessonId: "porcentagem",
    subject: "matematica",
    track: "enem",
    make: (n) => {
      const price = 80 + n * 20;
      const rate = [10, 15, 20, 25, 30][n % 5] / 100;
      return {
        stem: `Uma livraria anuncia um livro por ${money(price)} com ${rate * 100}% de desconto. Qual será o preço pago?`,
        correct: price * (1 - rate),
        wrong: [price * rate, price, price * (1 + rate), price * (1 - rate / 2)],
        explanation: `O desconto é ${money(price * rate)}. Portanto, ${money(price)} − ${money(price * rate)} = ${money(price * (1 - rate))}.`,
        format: money,
      };
    },
  },
  {
    id: "variacao-sucessiva",
    lessonId: "porcentagem",
    subject: "matematica",
    track: "enem",
    make: (n) => {
      const price = 100 + n * 40;
      const rate = [10, 20, 25][n % 3] / 100;
      return {
        stem: `Um serviço custa ${money(price)}. Seu preço sobe ${rate * 100}% e, depois, recebe desconto de ${rate * 100}% sobre o novo valor. Qual é o preço final?`,
        correct: price * (1 + rate) * (1 - rate),
        wrong: [price, price * (1 - rate), price * (1 + rate), price * (1 - 2 * rate)],
        explanation: `As bases mudam: ${money(price)} × ${decimal(1 + rate)} × ${decimal(1 - rate)} = ${money(price * (1 + rate) * (1 - rate))}.`,
        format: money,
      };
    },
  },
  {
    id: "tarifa-afim",
    lessonId: "funcoes",
    subject: "matematica",
    track: "enem",
    make: (n) => {
      const fixed = 12 + n * 3;
      const unit = 4 + (n % 5);
      const count = 3 + (n % 7);
      return {
        stem: `Um serviço cobra taxa fixa de ${money(fixed)} e ${money(unit)} por unidade. Quanto se paga por ${count} unidades?`,
        correct: fixed + unit * count,
        wrong: [fixed + unit, unit * count, fixed * count, fixed + unit * (count + 1)],
        explanation: `C(x) = ${fixed} + ${unit}x. Para x = ${count}, C = ${fixed} + ${unit * count} = ${money(fixed + unit * count)}.`,
        format: money,
      };
    },
  },
  {
    id: "area-retangulo",
    lessonId: "geometria-plana",
    subject: "matematica",
    track: "enem",
    make: (n) => {
      const length = 6 + n;
      const width = 3 + (n % 5);
      return {
        stem: `Um jardim retangular mede ${length} m por ${width} m. Qual é sua área?`,
        correct: length * width,
        wrong: [
          2 * (length + width),
          length + width,
          (length * width) / 2,
          length * width + length,
        ],
        explanation: `A área do retângulo é comprimento × largura: ${length} × ${width} = ${length * width} m².`,
        format: (v) => `${decimal(v)} m²`,
      };
    },
  },
  {
    id: "volume-caixa",
    lessonId: "geometria-espacial",
    subject: "matematica",
    track: "enem",
    make: (n) => {
      const a = 2 + (n % 5),
        b = 3 + (n % 4),
        c = 4 + (n % 3);
      return {
        stem: `Uma caixa tem dimensões internas de ${a} dm, ${b} dm e ${c} dm. Qual é sua capacidade em litros?`,
        correct: a * b * c,
        wrong: [a * b + b * c + a * c, 2 * (a * b + b * c + a * c), a + b + c, (a * b * c) / 2],
        explanation: `O volume é ${a} × ${b} × ${c} = ${a * b * c} dm³. Cada dm³ equivale a 1 litro.`,
        format: (v) => `${decimal(v)} L`,
      };
    },
  },
  {
    id: "juros-simples",
    lessonId: "juros",
    subject: "matematica",
    track: "enem",
    make: (n) => {
      const capital = 200 + n * 50;
      const rate = [5, 10, 15][n % 3] / 100;
      const years = 2 + (n % 3);
      return {
        stem: `${money(capital)} são aplicados a juros simples de ${rate * 100}% ao ano por ${years} anos. Qual é o montante?`,
        correct: capital * (1 + rate * years),
        wrong: [
          capital,
          capital * (1 + rate),
          capital * (1 + rate) ** years,
          capital * rate * years,
        ],
        explanation: `M = C(1 + it) = ${capital} × (1 + ${decimal(rate)} × ${years}) = ${money(capital * (1 + rate * years))}.`,
        format: money,
      };
    },
  },
  {
    id: "media-dados",
    lessonId: "estatistica",
    subject: "matematica",
    track: "enem",
    make: (n) => {
      const a = 2 + n;
      return {
        stem: `Os valores registrados foram ${a}, ${a + 2}, ${a + 4} e ${a + 10}. Qual é a média aritmética?`,
        correct: a + 4,
        wrong: [a + 3, a + 2, a + 10, a + 16],
        explanation: `A soma é ${4 * a + 16}. Dividindo por 4, a média é ${a + 4}. A mediana seria ${a + 3}.`,
        format: decimal,
      };
    },
  },
  {
    id: "rapidez-media",
    lessonId: "fisica-movimento",
    subject: "natureza",
    track: "enem",
    make: (n) => {
      const speed = 12 + n;
      const hours = 2 + (n % 4);
      const distance = speed * hours;
      return {
        stem: `Um veículo percorre ${distance} km em ${hours} h a ritmo constante. Qual é sua rapidez média?`,
        correct: speed,
        wrong: [distance, hours, speed + 5, speed - 5],
        explanation: `Rapidez média = distância ÷ tempo = ${distance} ÷ ${hours} = ${speed} km/h.`,
        format: (v) => `${decimal(v)} km/h`,
      };
    },
  },
  {
    id: "consumo-eletrico",
    lessonId: "eletricidade",
    subject: "natureza",
    track: "enem",
    make: (n) => {
      const power = 200 + n * 100;
      const hours = 2 + (n % 5);
      const kilowatts = power / 1000;
      return {
        stem: `Um aparelho de ${power} W funciona por ${hours} horas. Qual é a energia consumida?`,
        correct: kilowatts * hours,
        wrong: [kilowatts, hours, power * hours, kilowatts * hours * 10],
        explanation: `${power} W = ${decimal(kilowatts)} kW. Energia = potência × tempo = ${decimal(kilowatts)} × ${hours} = ${decimal(kilowatts * hours)} kWh.`,
        format: (v) => `${decimal(v)} kWh`,
      };
    },
  },
  {
    id: "uniao-conjuntos",
    lessonId: "conjuntos",
    subject: "logica",
    track: "pmpe",
    make: (n) => {
      const a = 20 + n,
        b = 15 + (n % 8),
        both = 3 + (n % 5);
      return {
        stem: `Em uma turma, ${a} pessoas estudam inglês, ${b} estudam espanhol e ${both} estudam ambos. Quantas estudam pelo menos um dos idiomas?`,
        correct: a + b - both,
        wrong: [a + b, both, a - both, b - both],
        explanation: `Na união, subtraia quem foi contado duas vezes: ${a} + ${b} − ${both} = ${a + b - both}.`,
        format: decimal,
      };
    },
  },
  {
    id: "termo-pa",
    lessonId: "sequencias",
    subject: "logica",
    track: "pmpe",
    make: (n) => {
      const first = 2 + n,
        step = 2 + (n % 5),
        position = 5 + (n % 4);
      return {
        stem: `Uma PA começa em ${first} e tem razão ${step}. Qual é seu ${position}º termo?`,
        correct: first + (position - 1) * step,
        wrong: [
          first + position * step,
          first + (position - 2) * step,
          first * step * position,
          first + position,
        ],
        explanation: `aₙ = a₁ + (n−1)r = ${first} + (${position}−1) × ${step} = ${first + (position - 1) * step}.`,
        format: decimal,
      };
    },
  },
  {
    id: "escolha-duplas",
    lessonId: "contagem",
    subject: "logica",
    track: "pmpe",
    make: (n) => {
      const people = 5 + n;
      return {
        stem: `De um grupo de ${people} candidatos, quantas duplas diferentes podem ser formadas, sem importar a ordem?`,
        correct: (people * (people - 1)) / 2,
        wrong: [people * people, people * (people - 1), people, (people * (people + 1)) / 2],
        explanation: `Há ${people} escolhas para a primeira pessoa e ${people - 1} para a segunda; cada dupla foi contada duas vezes. Resultado: ${people} × ${people - 1} ÷ 2 = ${(people * (people - 1)) / 2}.`,
        format: decimal,
      };
    },
  },
];

const SERIES_SIZE = 13;
export const VARIABLE_QUESTIONS = models.flatMap((model) =>
  Array.from({ length: SERIES_SIZE }, (_, index) => {
    const { stem, correct, wrong, explanation, format } = model.make(index + 1);
    const values = [correct, ...wrong].map(format);
    // Some calculated distractors can coincide. Keep five distinct options.
    let offset = 1;
    while (new Set(values).size < 5) {
      const duplicate = values.findIndex((value, i) => values.indexOf(value) !== i);
      values[duplicate] = format(correct + offset);
      offset += 1;
    }
    const shift = (index * 3 + model.id.length) % 5;
    const options = [...values.slice(shift), ...values.slice(0, shift)];
    return {
      id: `tello-v-${model.id}-${index + 1}`,
      lessonId: model.lessonId,
      subject: model.subject,
      track: model.track,
      difficulty: index < 4 ? 1 : index < 9 ? 2 : 3,
      stem,
      options,
      answer: options.indexOf(format(correct)),
      explanation,
      source: "Autoral · Tello",
      year: 2026,
    };
  }),
);
