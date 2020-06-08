import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {
  mapPizzas = pizzas => pizzas.map(pizza => <Pizza
    key={pizza.id}
    id={pizza.id}
    topping={pizza.topping}
    size={pizza.size}
    vegetarian={pizza.vegetarian}
    loadEditPizza={this.props.loadEditPizza}
  />)

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {this.mapPizzas(this.props.pizzas)}
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
