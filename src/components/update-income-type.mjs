import { IncomeTypeController } from '../controllers/income-type.controller.mjs';

export class UpdateIncomeTypeComponent {
  constructor(selector, incomeTypeId, onUpdate) {
    this.element = document.querySelector(selector);
    this.onUpdate = onUpdate;
    this.incomeTypeId = incomeTypeId;

    this.init();
    this.element.addEventListener('submit', (e) => this.handleUpdateIncomeType(e));
  }

  init() {
    const incomeType = IncomeTypeController.getById(this.incomeTypeId);
    const name = this.element.querySelector('input[name="incomes-type"]');

    name.value = incomeType.name;
  }

  handleUpdateIncomeType(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="incomes-type"]');
    IncomeTypeController.update({ name: name.value, id: this.incomeTypeId });

    if (this.onUpdate) this.onUpdate();
  }
}
