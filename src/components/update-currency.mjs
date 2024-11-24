import { CurrencyController } from '../controllers/currency.controller.mjs';

export class UpdateCurrencyComponent {
  constructor(selector, currencyId, onUpdate) {
    this.element = document.querySelector(selector);
    this.onUpdate = onUpdate;
    this.currencyId = currencyId;

    this.init();
    this.element.addEventListener('submit', (e) => this.handleUpdateCurrency(e));
  }

  init() {
    const currency = CurrencyController.getById(this.currencyId);
    console.log(this.currencyId, this.element);
    const name = this.element.querySelector('input[name="currency"]');
    const rate = this.element.querySelector('input[name="rate"]');

    name.value = currency.name;
    rate.value = currency.rates.at(-1).rate;
  }

  handleUpdateCurrency(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = this.element.querySelector('input[name="currency"]');
    const rate = this.element.querySelector('input[name="rate"]');
    CurrencyController.update(this.currencyId, { name: name.value, rate: +rate.value });

    if (this.onUpdate) this.onUpdate();
  }
}
