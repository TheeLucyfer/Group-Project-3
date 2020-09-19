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
            price:0
        }
    );
    const mySubmitHandler = (type) => {
        console.log(type);
        if (type ==="buy"){
           alert("You are buying " + state.ticker)}
        else {
            alert("You are selling " + state.ticker)
        }
      }
    const myChangeHandler = (event) => {
        setState({ticker: event.target.value});
      }

      useEffect(() => {
        let timerId;
        timerId = window.setInterval(() => {
              setState({
                price: API.getCurrPrice(props.ticker)
              })
            }, 5000);
          return ()=>clearTimeout(timerId);
      })

  return (
    <form >
    <h1>{props.ticker}</h1>
  <p>Current Price: {state.price}</p>
    <p>Bid/Ask Price:</p>
    <input
      type='text'
      onChange={myChangeHandler}
      value={state.price}
      style={{width:'50%'}}
    />
    <p>Quantity:</p>
   <input
      type='text'
      onChange={myChangeHandler}
      style={{width:'50%'}}
      placeholder={API.getPresetQ(props.ticker)}
    />
    <br/>
    <button type="submit" name="action" value="Sell" onClick={() => mySubmitHandler('buy')}>Buy</button>
     <button type="submit" name="action" value="Buy" onClick={() => mySubmitHandler('sell')}>Sell</button>
    </form>

  );
}

export default TradeForm;


