const capitalizeFirstLetter = (val: string) =>
  String(val).charAt(0).toLocaleUpperCase() + String(val).slice(1);

const isNullOrWhitespace = (input: string) => {
  if (typeof input === 'undefined' || input == null) return true;
  return input.replace(/\s/g, '').length < 1;
};

const formatDateStr = (dateString: string, currentLanguage: string) =>
  new Intl.DateTimeFormat(currentLanguage, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));

const formatDate = (date: Date, currentLanguage: string) =>
  new Intl.DateTimeFormat(currentLanguage, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);

const isNumericAndNotNegative = (str: string): boolean => /^[0-9]+$/.test(str);

export {
  isNullOrWhitespace,
  formatDate,
  formatDateStr,
  capitalizeFirstLetter,
  isNumericAndNotNegative,
};
