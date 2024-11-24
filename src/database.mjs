export class Database {
  static readData(key) {
    return JSON.parse(window.localStorage.getItem(key)) ?? [];
  }

  static readDataById(key, id) {
    return (JSON.parse(window.localStorage.getItem(key)).filter((item) => +item.id === +id) ??
      [])[0];
  }

  static readDataByField(key, field, value) {
    return (JSON.parse(window.localStorage.getItem(key)) ?? []).filter(
      (item) => item[field] === value,
    )[0];
  }

  static addData(key, value) {
    const data = [...this.readData(key), value];

    window.localStorage.setItem(key, JSON.stringify(data));
  }

  static setData(key, value) {
    const stringValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringValue);
  }

  static setDataById(key, value) {
    const data = [...this.readData(key).filter((item) => +item.id !== +value.id), value];
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  static deleteDataById(key, id) {
    const data = this.readData(key).filter((item) => +item.id !== +id);
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}
