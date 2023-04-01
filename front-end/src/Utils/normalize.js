const formatValues = (value) => Number(value)
  .toLocaleString('pt-BR', { minimumFractionDigits: 2 });

const MIN = 10;

export const formatDate = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const formatDay = day < MIN ? `0${day}` : day;
  const formatMonth = month < MIN ? `0${month}` : month;
  return `${formatDay}/${formatMonth}/${year}`;
};

export default formatValues;
