export default class GetKcal {
  constructor(wrapper, results) {
    this.wrapper = document.querySelector(wrapper);
    this.results = document.querySelector(results);
  }

  onStart(event) {
    event.preventDefault();
    this.wrapperList = document.querySelectorAll('input');

    if(this.validate()) {
      this.insertHtml();
    }
  }

  getValue() {
    const [manChecked] = this.wrapper.querySelectorAll('input[name="gender"]')
    const [name, heigth] = Array.from(this.wrapperList);
    const { weight } = this.calcWeight(heigth, manChecked);

    return {
      name: name.value,
      heigth: heigth.value,
      weight,
    };
  }

  insertHtml(value) {
    const { name, heigth, weight } = this.getValue();

    const html = `
      <h1>Nome: ${name}</h1>
      <p>Altura: ${heigth}</p>
      <p>Seu peso ideal é: ${weight}kg</p>
    `;

    this.results.innerHTML = html;
  }

  calcWeight(heigth, gender) {
    const genderValue = gender.checked ? 22 : 21;
    const weight = genderValue * Math.pow(heigth.value, 2);

    return { weight: weight.toFixed(2) };
  }

  validate() {
    const { name, heigth } = this.getValue();
    
    if(name && heigth) {
      return true;
    }

    return false;
  }

  addEvent() {
    this.wrapper.addEventListener('submit', this.onStart);
  }

  onBind() {
    this.onStart = this.onStart.bind(this);
  }

  init() {
    if (this.wrapper) {
      this.onBind();
      this.addEvent();
    }

    return this;
  }
}
