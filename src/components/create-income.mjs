import { IncomeTypeController } from '../controllers/income-type.controller.mjs';
import { CurrencyController } from '../controllers/currency.controller.mjs';
import { DropdownComponent } from '../components/dropdown.mjs';
import { IncomeController } from '../controllers/income.controller.mjs';

export class CreateIncomeComponent {
  constructor(selector, onIncomeCreate) {
    this.element = document.querySelector(selector);
    this.onIncomeCreate = onIncomeCreate;
    this.render();

    this.element.addEventListener('submit', (e) => this.handleCreateIncome(e));
  }

  render() {
    const incomeTypes = IncomeTypeController.get().map((type) => type.name);
    const currencies = CurrencyController.get().map((type) => type.name);

    const typesDropdown = new DropdownComponent('.create__income-type', incomeTypes, false, false);

    const currenciesDropdown = new DropdownComponent(
      '.create__income-currency',
      ['RUB', ...currencies],
      false,
      false,
    );
  }

  handleCreateIncome(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="name"]');
    const amount = this.element.querySelector('input[name="amount"]');
    const type = this.element.querySelector('.create__income-type .dropdown__title-text');
    const currency = this.element.querySelector('.create__income-currency .dropdown__title-text');

    const dto = {
      name: name.value,
      value: amount.value,
      type: type.textContent,
      currency: currency.textContent,
    };

    IncomeController.create(dto);

    name.value = '';
    amount.value = '';

    if (this.onIncomeCreate) this.onIncomeCreate();
  }
}
