export const formatCurrency = (amount, currencyCode) => {
  const currencyLocales = {
    USD: 'en-US',
    EUR: 'de-DE',
    RUB: 'ru-RU',
    JPY: 'ja-JP',
    GBP: 'en-GB',
    INR: 'en-IN',
  };

  const locale = currencyLocales[currencyCode] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};
