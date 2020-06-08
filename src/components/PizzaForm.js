import React from "react"

const PizzaForm = props => {
  return (
    <div className="form-row" >
      <div className="col-5">
        <input type="text" className="form-control" placeholder="Pizza Topping" name="topping" id="pizza-topping" onChange={e => props.handleFormChange(e)} value={
          props.topping
        } />
      </div>
      <div className="col">
        <select value={props.size} className="form-control" name="size" id="pizza-size" onChange={e => props.handleFormChange(e)}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input className="form-check-input" type="radio" value="Vegetarian" checked={props.vegetarian} onChange={() => props.updateVegetarian()} />
          <label className="form-check-label">
            Vegetarian
            </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!props.vegetarian} onChange={() => props.updateVegetarian()} />
          <label className="form-check-label">
            Not Vegetarian
            </label>
        </div>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success" onClick={() => props.createOrEditPizza()}>Submit</button>
      </div>
    </div>

  )
}

export default PizzaForm
