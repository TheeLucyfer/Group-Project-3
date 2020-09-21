import React,{ useEffect, useState,useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'
import TradeForm from '../TradeForm/TradeForm'
import './Trade.css'
import { Grid, Card, Icon, Image , Button} from 'semantic-ui-react'
import API from '../../utils/yahooAPI'
import UserContext from  "../../utils/UserContext";

function Trade(props) {
  const { user} = useContext(UserContext);
  const [tickers,setTickers] =useState([]);

  console.log('Hello,',user)
  
    useEffect(() => {
        axios.get(API_BASE_URL+'/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
              // get positions for this 
    axios.get(API_BASE_URL+'/api/positions/'+user)
    .then(function (response) {
       const data=response.data;
       const tickerArr = data.map((item)=>{
        return item.ticker}
       );
       setTickers(tickerArr);

   })
        })
        .catch(function (error) {
          redirectToLogin()
        });
      },[])


    function redirectToLogin() {
    props.history.push('/login');
    }
    const tickerArr=['AAPL','NVDA','TSLA','AMZN','QQQ','SPY','SHOP']

    return(
      // <div className="row-12">
      <Card.Group> 
        <div className='container'>
            
            <div className='row'>
            {tickers.map(ticker => (
              <div className='col-md-4' style={{borderStyle:'solid', marginTop:'10px',height:'10%',marginRight:'10px'}}>
                  <TradeForm ticker={ticker} key={ticker}/>
                  </div>
                ))}
            </div>
            </div>
       </Card.Group>     

    )
}

export default withRouter(Trade);