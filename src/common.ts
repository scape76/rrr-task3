export const searchForDatesInContent = (str: string): string =>
  (str.match(/\d{2}([\/.-])\d{2}\1\d{4}/g) || ['']).join(' ');
