export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

export const formatPoints = (points: number): string => {
  return `${points.toLocaleString('pt-BR')} pts`;
};
