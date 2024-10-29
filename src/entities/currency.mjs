import { Rate } from "./rate.mjs";

export class Currency {
  constructor(name, rates = [], id = Date.now()) {
    this.id = id;
    this.name = name;
    this.rates = rates;
  }

  addRate(date, buy, sell) {
    const isRateExist = this.rates.filter((r) => r.date === date)[0];

    if (!isRateExist) this.rates.push(new Rate(date, buy, sell));
  }

  getRateByDate(date) {
    const rate = this.rates.filter((rate) => rate.date === date)[0];

    return rate;
  }
}
