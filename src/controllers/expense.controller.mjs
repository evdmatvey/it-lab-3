import { Database } from '../database.mjs';
import { Expense } from '../entities/expense.mjs';
import { formatDate } from '../utils/format-date.mjs';

export class ExpenseController {
  static #datakey = 'Expense';

  static create({ value, currency, type, name }) {
    const date = formatDate(Date.now());
    const expense = new Expense({ value, currency, type, name, date });

    Database.addData(this.#datakey, expense);

    return expense;
  }

  static get() {
    const expenses = Database.readData(this.#datakey);

    return expenses.map((e) => new Expense(e));
  }

  static getById(id) {
    const expense = Database.readDataById(this.#datakey, id);

    return new Expense(expense);
  }

  static update(data) {
    const isExpenseExist = Database.readDataById(this.#datakey, data.id);

    if (!isExpenseExist) return;
    const expense = new Expense(data);

    Database.setDataById(this.#datakey, expense);
  }

  static delete(id) {
    const isExpenseExist = Database.readDataById(this.#datakey, id);

    if (!isExpenseExist) return;

    Database.deleteDataById(this.#datakey, id);
  }
}
