import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API"
import axios from 'axios'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';


// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function TradeForm(props) {

    
    const [state, setState]=useState(
        {
            price:0,
            quantity:API.getPresetQ(props.ticker)
        }
    );
    const mySubmitHandler = (type,event) => {
      
        console.log(type);
        if (type ==="buy"){
           alert("Finish buying " + String(state.quantity)+" "+props.ticker+" at " +String(state.price)+" per share")}
        else {
            alert("You are selling " + props.ticker)
        }
      }
    const quantityChangeHandler = (event) => {
        setState({price:state.price,quantity: event.target.value});
        console.log('value',event.target.value)
        console.log('state',state.quantity)
      }

      useEffect(() => {
        let timerId;
        timerId = window.setInterval(() => {
              setState({
                quantity:state.quantity,
                price: API.getCurrPrice(props.ticker)
              })
            }, 2000);
          return ()=>clearTimeout(timerId);
      })

  return (
    <form >
    <h1>{props.ticker}</h1>
  <p>Current Price: {state.price}</p>
    <p>Bid/Ask Price:</p>
    <input
      type='text'
      value={state.price}
      style={{width:'50%'}}
    />
    <p>Quantity:</p>
   <input
      type='text'
      onChange={quantityChangeHandler}
      style={{width:'50%'}}
      placeholder={API.getPresetQ(props.ticker)}
      value={state.quantity}
    />
    <br/>
    <button type="submit" name="action" value="Sell" onClick={() => mySubmitHandler('buy',Event)}>Buy</button>
     <button type="submit" name="action" value="Buy" onClick={() => mySubmitHandler('sell',Event)}>Sell</button>
    </form>

  );
}

export default TradeForm;


