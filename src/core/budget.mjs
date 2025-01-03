import { Database } from '../database.mjs';
import { compareDates } from '../utils/compare-dates.mjs';
import { sumMoneys } from '../utils/sum-moneys.mjs';

export class Budget {
  static #currencies = Database.readData('Currency');
  static #incomeTypes = Database.readData('IncomeType');
  static #expenseTypes = Database.readData('ExpenseType');
  static #income = Database.readData('Income');
  static #expense = Database.readData('Expense');

  static loadData() {
    this.#currencies = Database.readData('Currency');
    this.#incomeTypes = Database.readData('IncomeType');
    this.#expenseTypes = Database.readData('ExpenseType');
    this.#income = Database.readData('Income');
    this.#expense = Database.readData('Expense');
  }

  static filter(startDate, endDate, incomeType = '', expenseType = '') {
    this.loadData();
    const incomes = this.#income
      .filter((i) => compareDates(i.date, startDate) >= 0)
      .filter((i) => compareDates(i.date, endDate) <= 0)
      .filter((i) => (incomeType ? i.type.name === incomeType : true));

    const expenses = this.#expense
      .filter((e) => compareDates(e.date, startDate) >= 0)
      .filter((e) => compareDates(e.date, endDate) <= 0)
      .filter((e) => (expenseType ? e.type.name === expenseType : true));

    return { incomes, expenses };
  }

  static balance(startDate, endDate, incomeType = '', expenseType = '') {
    const { incomes, expenses } = this.filter(startDate, endDate, incomeType, expenseType);
    const income = sumMoneys(
      incomes.map((income) => ({ currency: income.currency, value: income.value })),
    );
    const expense =
      -1 *
      sumMoneys(expenses.map((expense) => ({ currency: expense.currency, value: expense.value })));

    return income + expense;
  }
}
