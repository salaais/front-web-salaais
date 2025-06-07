export function timeDuration(durationStr: string) {
  // inclui 's' nas unidades, mantendo 'mo' para mês
  const match = /^(\d+)(mo|[smhdwy])$/i.exec(durationStr);
  if (!match) throw new Error('Formato inválido. Use "5s", "5m", "2h", "1d", "1mo", "1y", etc.');

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
