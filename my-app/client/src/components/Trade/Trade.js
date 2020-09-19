import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'
import TradeForm from '../TradeForm/TradeForm'
function Trade(props) {
    useEffect(() => {
        axios.get(API_BASE_URL+'/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
        })
        .catch(function (error) {
          redirectToLogin()
        });
      })
    function redirectToLogin() {
    props.history.push('/login');
    }
    const tickerArr=['AAPL','NVDA','TSLA','AMZN']
    return(
        <div className="mt-2">
            {tickerArr.map(ticker => (
                  <TradeForm ticker={ticker} key={ticker}/>
                ))}
            
        </div>
    )
}

export default withRouter(Trade);