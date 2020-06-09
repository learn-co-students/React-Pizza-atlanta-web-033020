import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    editPizza: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  editPizza = (pizza) => {
    this.setState({editPizza: pizza})
  }

  submitPizzaEdit = (pizza) => {
    fetch(`http://localhost:3000/pizzas/${pizza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(pizza)
    })
    .then(res => res.json())
    .then(pizza => {
      console.log(pizza)
      let pizzasCopy = [...this.state.pizzas]
      let index = pizzasCopy.findIndex(p => p.id === pizza.id)
      pizzasCopy.splice(index, 1, pizza)
      this.setState({pizzas: pizzasCopy})
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm editPizza={this.state.editPizza} />
        <PizzaList 
          pizzas={this.state.pizzas} 
          editPizza={this.editPizza} 
          submitPizzaEdit={this.submitPizzaEdit}
        />
      </Fragment>
    );
  }
}

export default App;