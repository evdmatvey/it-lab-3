export class ExpenseType {
  constructor(name, id = Date.now()) {
    this.name = name;
    this.id = id;
  }
}
