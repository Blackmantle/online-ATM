export const currencyFormat = (str: string, prefix = '', suffix = '', sep = ',') => (
  prefix + str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + sep) + suffix
);
export const escapeRegExp = (str: string) => str.replace(/[^0-9.]/g, '');
export const checkCurrencyFormat = (str: string) => /^$|^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(str);