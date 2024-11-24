import { CurrencyController } from '../controllers/currency.controller.mjs';

export const sumMoneys = (moneys) => {
  let sum = 0;

  moneys.forEach((money) => {
    const { currency, value } = money;
    const valueInRub = convertToRub(currency, value);

    sum += +valueInRub;
  });

  return sum;
};

const convertToRub = (currency, value) => {
  if (currency === 'RUB') return value;

  const currencies = CurrencyController.get();
  const rate = currencies.filter((c) => c.name === currency)[0].rates.at(-1).rate;

  return value * rate;
};
