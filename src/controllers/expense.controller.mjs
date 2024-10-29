import { Database } from "../database.mjs";
import { Expense } from "../entities/expense.mjs";

export class ExpenseController {
  static #datakey = "Expense";

  static create(value, currency, type, date) {
    const expense = new Expense(value, currency, type, date);

    Database.addData(this.#datakey, expense);

    return expense;
  }

  static get() {
    const expenses = Database.readData(this.#datakey);

    return expenses.map(
      (e) => new Expense(e.value, e.currency, e.type, e.date, e.id),
    );
  }

  static getById(id) {
    const expense = Database.readDataById(this.#datakey, id);

    return new Expense(
      expense.value,
      expense.currency,
      expense.type,
      expense.date,
      expense.id,
    );
  }

  static update(data) {
    const isExpenseExist = Database.readDataById(this.#datakey, data.id);

    if (!isExpenseExist) return;

    Database.setDataById(this.#datakey, data);
  }

  static delete(id) {
    const isExpenseExist = Database.readDataById(this.#datakey, id);

    if (!isExpenseExist) return;

    Database.deleteDataById(this.#datakey, id);
  }
}
