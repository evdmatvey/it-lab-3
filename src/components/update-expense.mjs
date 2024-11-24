import { CurrencyController } from '../controllers/currency.controller.mjs';
import { ExpenseTypeController } from '../controllers/expense-type.controller.mjs';
import { ExpenseController } from '../controllers/expense.controller.mjs';
import { DropdownComponent } from './dropdown.mjs';

export class UpdateExpenseComponent {
  constructor(selector, expenseId, onExpenseUpdate) {
    this.element = document.querySelector(selector);
    this.expenseId = expenseId;
    this.onExpenseUpdate = onExpenseUpdate;

    this.render();

    this.element.addEventListener('submit', (e) => this.handleUpdate(e));
  }

  render() {
    const expense = ExpenseController.getById(+this.expenseId);
    this.expense = expense;

    const name = this.element.querySelector('input[name="name"]');
    const amount = this.element.querySelector('input[name="amount"]');
    console.log(this.expenseId);

    name.value = expense.name;
    amount.value = expense.value;

    const expenseTypes = ExpenseTypeController.get().map((type) => type.name);
    const currencies = CurrencyController.get().map((type) => type.name);

    const typesDropdown = new DropdownComponent(
      '.update__expense-type',
      expenseTypes,
      false,
      false,
    );

    const currenciesDropdown = new DropdownComponent(
      '.update__expense-currency',
      ['RUB', ...currencies],
      false,
      false,
    );
  }

  handleUpdate(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="name"]');
    const amount = this.element.querySelector('input[name="amount"]');
    const type = this.element.querySelector('.update__expense-type .dropdown__title-text');
    const currency = this.element.querySelector('.update__expense-currency .dropdown__title-text');

    const dto = {
      id: this.expenseId,
      name: name.value,
      value: amount.value,
      type: type.textContent,
      date: this.expense.date,
      currency: currency.textContent,
    };

    ExpenseController.update(dto);

    name.value = '';
    amount.value = '';

    if (this.onExpenseUpdate) this.onExpenseUpdate();
  }
}
