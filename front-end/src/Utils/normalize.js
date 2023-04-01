const formatValues = (value) => Number(value)
  .toLocaleString('pt-BR', { minimumFractionDigits: 2 });

const MONTH_MIN = 10;

export const formatDate = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const formatMonth = month < MONTH_MIN ? `0${month}` : month;
  return `${day}/${formatMonth}/${year}`;
};

export default formatValues;
