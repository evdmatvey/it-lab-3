export class Currency {
  constructor(name, rates = [], id = Date.now()) {
    this.id = id;
    this.name = name;
    this.rates = rates;
  }

  addRate(date, rate) {
    const isRateExist = this.rates.filter((r) => r.date === date)[0];

    if (!isRateExist) this.rates.push({ date, rate });
    else this.rates.at(-1).rate = rate;
  }

  getRateByDate(date) {
    const rate = this.rates.filter((rate) => rate.date === date)[0];

    return rate;
  }
}
