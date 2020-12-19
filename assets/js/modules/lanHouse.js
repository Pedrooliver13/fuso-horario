export default class LanHouse {
  constructor(wrapper, results) {
    this.wrapper = document.querySelector(wrapper);
    this.results = document.querySelector(results);
    this.dados;

    this.getValue = this.getValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setValue() {
    const dadosPrice = this.wrapper.querySelector('#price');

    if (localStorage.getItem('price')) {
      dadosPrice.value = localStorage['price'];
      this.dados = { price: localStorage['price'] };
    }
  }

  getValue({ target }) {
    this.dados = { ...this.dados, [target.name]: target.value };

    if (this.dados.price !== undefined) {
      localStorage.setItem('price', this.dados.price);
    }
  }

  insertValue(value) {
    const valueLocale = Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    this.results.innerHTML += `Valor a pagar: ${valueLocale}`;
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.dados) {
      const { price, time } = this.dados;
      const totalPrice = Math.ceil(time / 15) * price;

      this.results.innerHTML = '';
      this.insertValue(totalPrice);
    }
  }

  addListener() {
    this.wrapper.addEventListener('change', this.getValue);
    this.wrapper.addEventListener('submit', this.onSubmit);
  }

  init() {
    if (this.wrapper) {
      this.addListener();
      this.setValue();
    }

    return this;
  }
}
