import { Database } from "../database.mjs";
import { Currency } from "../entities/currency.mjs";

export class CurrencyController {
  static #datakey = "Currency";

  static create(name) {
    const isCurrencyExist = Database.readDataByField(
      this.#datakey,
      "name",
      name,
    );

    if (isCurrencyExist) return;

    const currency = new Currency(name);

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

  static update(data) {
    const isCurrencyExist = Database.readDataById(this.#datakey, data.id);

    if (!isCurrencyExist) return;

    Database.setDataById(this.#datakey, data);
  }

  static delete(id) {
    const isCurrencyExist = Database.readDataById(this.#datakey, id);

    if (!isCurrencyExist) return;

    Database.deleteDataById(this.#datakey, id);
  }
}
