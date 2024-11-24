import { CurrencyController } from '../controllers/currency.controller.mjs';

export class CreateCurrencyComponent {
  constructor(selector, onCreate) {
    this.element = document.querySelector(selector);
    this.onCreate = onCreate;

    this.element.addEventListener('submit', (e) => this.handleCreateCurrency(e));
  }

  handleCreateCurrency(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="currency"]');
    const rate = this.element.querySelector('input[name="rate"]');

    CurrencyController.create(name.value, +rate.value);

    name.value = '';
    rate.value = '';

    if (this.onCreate) this.onCreate();
  }
}
