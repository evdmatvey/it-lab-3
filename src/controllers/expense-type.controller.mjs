import { Database } from "../database.mjs";
import { ExpenseType } from "../entities/expense-type.mjs";

export class ExpenseTypeController {
  static #datakey = "ExpenseType";

  static create(name) {
    const isExpenseTypeExist = Database.readDataByField(
      this.#datakey,
      "name",
      name,
    );

    if (isExpenseTypeExist) return;

    const expenseType = new ExpenseType(name);

    Database.addData(this.#datakey, expenseType);

    return expenseType;
  }

  static get() {
    const expenseTypes = Database.readData(this.#datakey);

    return expenseTypes.map((e) => new ExpenseType(e.name, e.id));
  }

  static getById(id) {
    const expenseType = Database.readDataById(this.#datakey, id);

    return new ExpenseType(expenseType.name, expenseType.id);
  }

  static getByName(name) {
    const expenseType = Database.readDataByField(this.#datakey, "name", name);

    return expenseType;
  }

  static update(data) {
    const isExpenseTypeExist = Database.readDataById(this.#datakey, data.id);

    if (!isExpenseTypeExist) return;

    Database.setDataById(this.#datakey, data);
  }

  static delete(id) {
    const isExpenseTypeExist = Database.readDataById(this.#datakey, id);

    if (!isExpenseTypeExist) return;

    Database.deleteDataById(this.#datakey, id);
  }
}
