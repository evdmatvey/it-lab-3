export class Income {
  constructor(value, currency, type, date, id = Date.now()) {
    this.value = value;
    this.currency = currency;
    this.type = type;
    this.date = date;
    this.id = id;
  }
}
