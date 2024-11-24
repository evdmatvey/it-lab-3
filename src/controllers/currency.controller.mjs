import { Database } from '../database.mjs';
import { Currency } from '../entities/currency.mjs';
import { formatDate } from '../utils/format-date.mjs';

export class CurrencyController {
  static #datakey = 'Currency';

  static create(name, rate) {
    const isCurrencyExist = Database.readDataByField(this.#datakey, 'name', name);

    if (isCurrencyExist) return;

    const currency = new Currency(name);
    currency.addRate(formatDate(Date.now()), rate);

    Database.addData(this.#datakey, currency);

    return currency;
  }

  static get() {
    const currencies = Database.readData(this.#datakey);

    return currencies.map((c) => new Currency(c.name, c.rates, c.id));
  }

  static getById(id) {
    const currency = Database.readDataById(this.#datakey, id);

    return new Currency(currency.name, currency.rates, currency.id);
  }

  static update(id, data) {
    const isCurrencyExist = Database.readDataById(this.#datakey, id);
    if (!isCurrencyExist) return;

    const currency = new Currency(isCurrencyExist.name, isCurrencyExist.rates, isCurrencyExist.id);

    currency.addRate(formatDate(Date.now()), data.rate);
    currency.name = data.name;

    Database.setDataById(this.#datakey, currency);
  }

  static delete(id) {
    const isCurrencyExist = Database.readDataById(this.#datakey, id);

    if (!isCurrencyExist) return;

    Database.deleteDataById(this.#datakey, id);
  }
}
