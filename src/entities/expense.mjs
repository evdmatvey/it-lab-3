export class Expense {
  constructor({ value, currency, type, name, date, id = Date.now() }) {
    this.value = value;
    this.currency = currency;
    this.type = type;
    this.date = date;
    this.name = name;
    this.id = id;
  }
}
