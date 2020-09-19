import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'
import TradeForm from '../TradeForm/TradeForm'
import './Trade.css'
import { Grid, Card, Icon, Image , Button} from 'semantic-ui-react'
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
      // <div className="row-12">
      <Card.Group> 

            {tickerArr.map(ticker => (
              <div style={{borderStyle:'solid', marginTop:'10px',height:'10%'}}>
                  <TradeForm ticker={ticker} key={ticker}/>
                  </div>
                ))}
       </Card.Group>     

    )
}

export default withRouter(Trade);