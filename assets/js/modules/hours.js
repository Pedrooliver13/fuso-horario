export default class Hours {
  constructor(wrapper, results) {
    this.wrapper = document.querySelector(wrapper);
    this.results = document.querySelector(results);

    this.dados = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const getHourInCountry = this.formatValue();
    this.setHtml(getHourInCountry);
  }

  formatValue() {
    const { hourInBrazil, country } = this.getValue();
    let hourInCountry = (Number(hourInBrazil) + Number(country)).toFixed(2);
    const oneDay = 24;

    if (hourInCountry > oneDay) {
      hourInCountry = (hourInCountry - oneDay).toFixed(2);
    }

    return hourInCountry;
  }

  getValue() {
    const [hour, country] = this.wrapper.querySelectorAll('.input');
    return { hourInBrazil: hour.value, country: country.value };
  }

  setHtml(value) {
    const hour = value.replace(/\D/g, "H");
    const html = `
      <h1>a Hora nesse país é ${hour}</h1>
    `

    this.results.innerHTML = html;
  }

  addEvent() {
    this.wrapper.addEventListener('submit', this.onSubmit);
  }

  init() {
    if (this.wrapper) {
      this.addEvent();
    }

    return this;
  }
}
