import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    pizzaToEdit: {},
    editPizzaId: '',
    editTopping: '',
    editSize: '',
    editVegetarian: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  handleToppingChange = event => {
    this.setState({editTopping: event})
  }

  handleSizeChange = event => {
    this.setState({editSize: event})
  }

  handleVegetarianChange = event => {
    if (event === 'Vegetarian') {
      this.setState({ editVegetarian: true })
    } else {
      this.setState({ editVegetarian: false })
    }
  }
  editPizza = (pizza) => {
    this.setState({
      editPizzaId: pizza.id,
      editTopping: pizza.topping,
      editSize: pizza.size,
      editVegetarian: pizza.vegetarian
    })
  }

  submitPizzaEdit = (pizzaDetails, id) => {
    let pizzaObj = {
        topping: pizzaDetails.topping,
        size: pizzaDetails.size,
        vegetarian: pizzaDetails.vegetarian
    }
    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(pizzaObj)
    })
    .then(res => res.json())
    .then(pizzaData => {
      let pizzasCopy = [...this.state.pizzas]
      pizzasCopy = pizzasCopy.map(pizza => {
        if (pizza.id !== id) {
          return pizza
        } else { return pizzaData }
      })
      this.setState({pizzas: pizzasCopy})
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          id={this.state.editPizzaId}
          topping={this.state.editTopping}  
          size={this.state.editSize} 
          vegetarian={this.state.editVegetarian} 
          handleToppingChange={this.handleToppingChange}
          handleSizeChange={this.handleSizeChange}
          handleVegetarianChange={this.handleVegetarianChange}
          submitPizzaEdit={this.submitPizzaEdit}
        />
        <PizzaList 
          pizzas={this.state.pizzas} 
          editPizza={this.editPizza} 
        />
      </Fragment>
    );
  }
}

export default App;