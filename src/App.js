import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const BASE_URL = 'http://localhost:3000/pizzas/'

class App extends Component {
  state = {
    pizzas: [],
    id: null,
    topping: '',
    size: 'Small',
    vegetarian: false,
    edittingPizza: false
  }

  componentDidMount() {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(pizzas => this.setState({ pizzas: pizzas }));
  }

  loadEditPizza = (e, id) => {
    this.setState({
      topping: e.target.parentElement.parentElement.querySelector('#pizza-topping').textContent,
      size: e.target.parentElement.parentElement.querySelector('#pizza-size').textContent,
      vegetarian: e.target.parentElement.parentElement.querySelector('#pizza-vegetarian').textContent === 'Yes' ? true : false,
      id: id,
      edittingPizza: true
    });
  }

  createOrEditPizza = e => {
    if (this.state.edittingPizza) {
      this.editPizza();
      this.setState({ edittingPizza: false, id: null });
    } else {
      this.createPizza();
    }
    this.clearFormContents();
  }

  createPizza = () => {
    const pizzaObj = this.createPizzaObject();

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pizzaObj)
    }

    fetch(BASE_URL, fetchObj)
      .then(response => response.json())
      .then(pizza => {
        this.setState({ pizzas: [...this.state.pizzas, pizza] })
      })
  }

  editPizza = () => {
    const pizzaObj = this.createPizzaObject();

    const fetchObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pizzaObj)
    }

    fetch(BASE_URL + this.state.id, fetchObj)
      .then(response => response.json())
      .then(pizza => {
        const newPizzas = [...this.state.pizzas];
        const pizzaIndex = this.state.pizzas.findIndex(pizza => pizza.id === this.state.id);
        newPizzas.splice(pizzaIndex, 1, pizza);
        this.setState({ pizzas: newPizzas });
      })
  }

  handleFormChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateVegetarian = () => {
    this.setState({ vegetarian: !this.state.vegetarian })
  }

  createPizzaObject() {
    return {
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian
    }
  }

  clearFormContents = () => {
    this.setState({
      topping: '',
      size: 'Small',
      vegetarian: false
    });
  }

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          topping={this.state.topping}
          size={this.state.size}
          vegetarian={this.state.vegetarian}
          handleFormChange={this.handleFormChange}
          updateVegetarian={this.updateVegetarian}
          createOrEditPizza={this.createOrEditPizza}
        />
        <PizzaList pizzas={this.state.pizzas} loadEditPizza={this.loadEditPizza} />
      </Fragment>
    );
  }
}

export default App;
