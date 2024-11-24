import { CurrencyController } from '../controllers/currency.controller.mjs';
import { IncomeTypeController } from '../controllers/income-type.controller.mjs';
import { IncomeController } from '../controllers/income.controller.mjs';
import { DropdownComponent } from './dropdown.mjs';

export class UpdateIncomeComponent {
  constructor(selector, incomeId, onIncomeUpdate) {
    this.element = document.querySelector(selector);
    this.incomeId = incomeId;
    this.onIncomeUpdate = onIncomeUpdate;

    this.render();

    this.element.addEventListener('submit', (e) => this.handleUpdate(e));
  }

  render() {
    const income = IncomeController.getById(+this.incomeId);
    this.income = income;

    const name = this.element.querySelector('input[name="name"]');
    const amount = this.element.querySelector('input[name="amount"]');

    name.value = income.name;
    amount.value = income.value;

    const incomeTypes = IncomeTypeController.get().map((type) => type.name);
    const currencies = CurrencyController.get().map((type) => type.name);

    const typesDropdown = new DropdownComponent('.update__income-type', incomeTypes, false, false);

    const currenciesDropdown = new DropdownComponent(
      '.update__income-currency',
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
    const type = this.element.querySelector('.update__income-type .dropdown__title-text');
    const currency = this.element.querySelector('.update__income-currency .dropdown__title-text');

    const dto = {
      id: this.incomeId,
      name: name.value,
      value: amount.value,
      type: type.textContent,
      date: this.income.date,
      currency: currency.textContent,
    };

    IncomeController.update(dto);

    name.value = '';
    amount.value = '';

    if (this.onIncomeUpdate) this.onIncomeUpdate();
  }
}
