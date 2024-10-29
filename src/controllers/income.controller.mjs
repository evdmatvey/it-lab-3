import { Database } from "../database.mjs";
import { Income } from "../entities/income.mjs";

export class IncomeController {
  static #datakey = "Income";

  static create(value, currency, type, date) {
    const income = new Income(value, currency, type, date);

    Database.addData(this.#datakey, income);

    return income;
  }

  static get() {
    const incomes = Database.readData(this.#datakey);

    return incomes.map(
      (i) => new Income(i.value, i.currency, i.type, i.date, i.id),
    );
  }

  static getById(id) {
    const income = Database.readDataById(this.#datakey, id);

    return new Income(
      income.value,
      income.currency,
      income.type,
      income.date,
      income.id,
    );
  }

  static update(data) {
    const isIncomeExist = Database.readDataById(this.#datakey, data.id);

    if (!isIncomeExist) return;

    Database.setDataById(this.#datakey, data);
  }

  static delete(id) {
    const isIncomeExist = Database.readDataById(this.#datakey, id);

    if (!isIncomeExist) return;

    Database.deleteDataById(this.#datakey, id);
  }
}
