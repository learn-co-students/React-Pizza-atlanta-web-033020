import React from "react"

const Pizza = props => {
  return (
    <tr>
      <td id="pizza-topping">{props.topping}</td>
      <td id="pizza-size">{props.size}</td>
      <td id="pizza-vegetarian">{props.vegetarian ? 'Yes' : 'No'}</td>
      <td><button type="button" className="btn btn-primary" onClick={e => props.loadEditPizza(e, props.id)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
