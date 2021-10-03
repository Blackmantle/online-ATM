export const currencyFormat = (str: string, cur = '₽', sep = ',') => cur + str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + sep);
export const escapeRegExp = (str: string) => str.replace(/[^0-9.]/g, '');