import React,{useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/yahooAPI"
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';
import UserContext from  "../../utils/UserContext";





// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function TradeForm(props) {

    const { user} = useContext(UserContext);
    console.log('TradeForm',user)
    const [state, setState]=useState(
        {
            price:0,
            quantity:API.getPresetQ(props.ticker)
        }
    );
    const mySubmitHandler = (type) => {
      
        if (type ==="buy"){
          // Push a new transaction into the database by sending a post request to 
          axios.post(API_BASE_URL+'/api/positions/'+user, {ticker:props.ticker,email:user,quantity:state.quantity,cost:state.price,trading_buy_price:state.price*0.8,trading_quantity:state.quantity,trading_sell_price:state.price*1.2})
            .then(function (response) {
          alert(user+" Finish buying " + String(state.quantity)+" "+props.ticker+" at " +String(state.price)+" per share")})
            }
           //alert("Finish buying " + String(state.quantity)+" "+props.ticker+" at " +String(state.price)+" per share")}
        else {
          axios.post(API_BASE_URL+'/api/positions/'+user, {ticker:props.ticker,email:user,quantity:state.quantity,cost:-state.price,trading_buy_price:state.price*0.8,trading_quantity:state.quantity,trading_sell_price:state.price*1.2})
          .then(function (response) {
        alert(user+" Finish selling " + String(state.quantity)+" "+props.ticker+" at " +String(state.price)+" per share")})
        }
      }
    const quantityChangeHandler = (event) => {
        setState({price:state.price,quantity: event.target.value});
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
    <form style={{background:'gray'}}>
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


