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
    const tickerArr=['AAPL','NVDA','TSLA','AMZN','QQQ','SPY','SHOP']
    return(
      // <div className="row-12">
      <Card.Group> 
        <div className='container'>
            
            <div className='row'>
            {tickerArr.map(ticker => (
              <div className='col-md-3' style={{borderStyle:'solid', marginTop:'10px',height:'10%',marginRight:'10px'}}>
                  <TradeForm ticker={ticker} key={ticker}/>
                  </div>
                ))}
            </div>
            </div>
       </Card.Group>     

    )
}

export default withRouter(Trade);