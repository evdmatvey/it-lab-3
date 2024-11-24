import { ExpenseTypeController } from '../controllers/expense-type.controller.mjs';

export class UpdateExpenseTypeComponent {
  constructor(selector, expenseTypeId, onUpdate) {
    this.element = document.querySelector(selector);
    this.onUpdate = onUpdate;
    this.expenseTypeId = expenseTypeId;

    this.init();
    this.element.addEventListener('submit', (e) => this.handleUpdateExpenseType(e));
  }

  init() {
    const expenseType = ExpenseTypeController.getById(this.expenseTypeId);
    const name = this.element.querySelector('input[name="expenses-type"]');

    name.value = expenseType.name;
  }

  handleUpdateExpenseType(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="expenses-type"]');
    ExpenseTypeController.update({ name: name.value, id: this.expenseTypeId });

    if (this.onUpdate) this.onUpdate();
  }
}
