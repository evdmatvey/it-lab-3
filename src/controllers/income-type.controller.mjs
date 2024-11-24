import { Database } from '../database.mjs';
import { IncomeType } from '../entities/income-type.mjs';

export class IncomeTypeController {
  static #datakey = 'IncomeType';

  static create(name) {
    const isIncomeTypeExist = Database.readDataByField(this.#datakey, 'name', name);

    if (isIncomeTypeExist) return;

    const incomeType = new IncomeType(name);

    Database.addData(this.#datakey, incomeType);

    return incomeType;
  }

  static get() {
    const incomeTypes = Database.readData(this.#datakey);

    return incomeTypes.map((e) => new IncomeType(e.name, e.id));
  }

  static getById(id) {
    const incomeType = Database.readDataById(this.#datakey, id);

    return new IncomeType(incomeType.name, incomeType.id);
  }

  static getByName(name) {
    const incomeType = Database.readDataByField(this.#datakey, 'name', name);

    return incomeType;
  }

  static update(data) {
    const isIncomeTypeExist = Database.readDataById(this.#datakey, data.id);

    if (!isIncomeTypeExist) return;

    const incomeType = new IncomeType(data.name, data.id);

    Database.setDataById(this.#datakey, incomeType);
  }

  static delete(id) {
    const isIncomeTypeExist = Database.readDataById(this.#datakey, +id);
    if (!isIncomeTypeExist) return;

    Database.deleteDataById(this.#datakey, +id);
  }
}
