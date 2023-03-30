const formatValues = (value) => Number(value)
  .toLocaleString('pt-BR', { minimumFractionDigits: 2 });

export default formatValues;
