import { makeEnum } from "../enum";

export function timeDuration(durationStr: string) {
  // inclui 's' nas unidades, mantendo 'mo' para mês
  const match = /^(\d+)(mo|[smhdwy])$/i.exec(durationStr);
  if (!match) throw new Error('Formato inválido. Use "5s", "5m", "2h", "1d", "1mo", "1y".');

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 's': return value / 60; // segundos
    case 'm': return value; // minutos
    case 'h': return value * 60; // horas
    case 'd': return value * 60 * 24; // dias
    case 'w': return value * 60 * 24 * 7; // semanas
    case 'mo': return value * 60 * 24 * 30; // mês ≈ 30 dias
    case 'y': return value * 60 * 24 * 30 * 12; // ano ≈ 12 meses
    default: throw new Error('Unidade de tempo não suportada');
  }
}

export const Time = makeEnum({
  // Segundos
  "5s": "5s",
  "10s": "10s",
  "30s": "30s",

  // Minutos
  "1m": "1m",
  "5m": "5m",
  "10m": "10m",
  "15m": "15m",
  "30m": "30m",

  // Horas
  "1h": "1h",
  "2h": "2h",
  "4h": "4h",
  "6h": "6h",
  "12h": "12h",

  // Dias
  "1d": "1d",
  "2d": "2d",
  "3d": "3d",
  "7d": "7d",

  // Meses (aproximado como 30 dias)
  "1mo": "1mo",
  "3mo": "3mo",
  "6mo": "6mo",

  // Anos
  "1y": "1y",
});

