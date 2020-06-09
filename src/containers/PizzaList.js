import React, { Component } from 'react';
import Pizza from '../components/Pizza'

const PizzaList = (props) => {
  let pizzas = props.pizzas
  function mapPizzas() {
    return pizzas.map(pizza => <Pizza 
      pizza={pizza} 
      editPizza={props.editPizza} 
      submitPizzaEdit={props.submitPizzaEdit}
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
