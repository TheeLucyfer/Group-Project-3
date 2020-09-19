import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function TradeForm(props) {
    const [state, setState]=useState(
        {
            ticker:props.ticker
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

  return (
    <form >
    <h1>{state.ticker}</h1>
    <p>Current Price:</p>
    <p>Bid/Ask Price:</p>
    <input
      type='text'
      onChange={myChangeHandler}
    />
    <br/>
    {/* <input
      type='submit' value='Buy' key='buy' name='submit'
    />
    <input
      type='submit' value='Sell' key='sell' name='submit'
    /> */}
    <button type="submit" name="action" value="Sell" onClick={() => mySubmitHandler('buy')}>Buy</button>
     <button type="submit" name="action" value="Buy" onClick={() => mySubmitHandler('sell')}>Sell</button>
    </form>

  );
}

export default TradeForm;


