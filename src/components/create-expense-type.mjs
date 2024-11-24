import { ExpenseTypeController } from '../controllers/expense-type.controller.mjs';

export class CreateExpenseTypeComponent {
  constructor(selector, onCreate) {
    this.element = document.querySelector(selector);
    this.onCreate = onCreate;

    this.element.addEventListener('submit', (e) => this.handleCreateExpenseType(e));
  }

  handleCreateExpenseType(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="expenses-type"]');

    ExpenseTypeController.create(name.value);

    name.value = '';

    if (this.onCreate) this.onCreate();
  }
}
