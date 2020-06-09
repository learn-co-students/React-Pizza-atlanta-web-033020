import React from 'react';
import Pizza from '../components/Pizza'

const PizzaList = (props) => {
  let pizzas = props.pizzas
  function mapPizzas() {
    return pizzas.map(pizza => <Pizza 
      key={pizza.id}
      pizza={pizza} 
      editPizza={props.editPizza} 
    />
    )      
  }

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
        {
          mapPizzas(props)
        }
      </tbody>
    </table>
  );
}

export default PizzaList;
