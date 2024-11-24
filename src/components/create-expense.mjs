import { ExpenseTypeController } from '../controllers/expense-type.controller.mjs';
import { CurrencyController } from '../controllers/currency.controller.mjs';
import { DropdownComponent } from '../components/dropdown.mjs';
import { ExpenseController } from '../controllers/expense.controller.mjs';

export class CreateExpenseComponent {
  constructor(selector, onExpenseCreate) {
    this.element = document.querySelector(selector);
    this.onExpenseCreate = onExpenseCreate;
    this.render();

    this.element.addEventListener('submit', (e) => this.handleCreateExpense(e));
  }

  render() {
    const expenseTypes = ExpenseTypeController.get().map((type) => type.name);
    const currencies = CurrencyController.get().map((type) => type.name);

    const typesDropdown = new DropdownComponent(
      '.create__expense-type',
      expenseTypes,
      false,
      false,
    );

    const currenciesDropdown = new DropdownComponent(
      '.create__expense-currency',
      ['RUB', ...currencies],
      false,
      false,
    );
  }

  handleCreateExpense(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="name"]');
    const amount = this.element.querySelector('input[name="amount"]');
    const type = this.element.querySelector('.create__expense-type .dropdown__title-text');
    const currency = this.element.querySelector('.create__expense-currency .dropdown__title-text');

    const dto = {
      name: name.value,
      value: amount.value,
      type: type.textContent,
      currency: currency.textContent,
    };

    ExpenseController.create(dto);

    name.value = '';
    amount.value = '';

    if (this.onExpenseCreate) this.onExpenseCreate();
  }
}
