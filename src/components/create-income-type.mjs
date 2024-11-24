import { IncomeTypeController } from '../controllers/income-type.controller.mjs';

export class CreateIncomeTypeComponent {
  constructor(selector, onCreate) {
    this.element = document.querySelector(selector);
    this.onCreate = onCreate;

    this.element.addEventListener('submit', (e) => this.handleCreateIncomeType(e));
  }

  handleCreateIncomeType(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="incomes-type"]');

    IncomeTypeController.create(name.value);

    name.value = '';

    if (this.onCreate) this.onCreate();
  }
}
