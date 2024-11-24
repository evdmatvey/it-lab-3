import { Database } from '../database.mjs';
import { Income } from '../entities/income.mjs';
import { formatDate } from '../utils/format-date.mjs';

export class IncomeController {
  static #datakey = 'Income';

  static create({ value, currency, type, name }) {
    const date = formatDate(Date.now());
    const income = new Income({ value, currency, type, name, date });

    Database.addData(this.#datakey, income);

    return income;
  }

  static get() {
    const incomes = Database.readData(this.#datakey);

    return incomes.map((i) => new Income(i));
  }

  static getById(id) {
    const income = Database.readDataById(this.#datakey, id);

    return new Income(income);
  }

  static update(data) {
    const isIncomeExist = Database.readDataById(this.#datakey, data.id);

    if (!isIncomeExist) return;
    const income = new Income(data);

    Database.setDataById(this.#datakey, income);
  }

  static delete(id) {
    const isIncomeExist = Database.readDataById(this.#datakey, id);

    if (!isIncomeExist) return;

    Database.deleteDataById(this.#datakey, id);
  }
}
