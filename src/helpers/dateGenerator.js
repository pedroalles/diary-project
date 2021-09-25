export const generateDate = () => {
  return new Date().toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' });
};
