import React,{ useEffect, useState,useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'
import TradeForm from '../TradeForm/TradeForm'
import TradeFormEmpty from '../TradeFormEmpty/TradeFormEmpty'
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
       const mergedArr=mergeArr(data);
       const tickerArr = mergedArr.map((item)=>{
        return item.ticker}
       );
       setTickers(tickerArr);

   })
        })
        .catch(function (error) {
          redirectToLogin()
        });
      },[])

  function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }
  
  
  function mergeArr(arr){
      const tickerArr=arr.map(item=>{
        return item.ticker
      })
      const unique=tickerArr.filter(onlyUnique);
      const nUniq=unique.length;
      const output=[];
      for (let i=0; i<nUniq; i++){
          const totalCost=0;
          const totalq=0;
          for (let j=0; j<arr.length; j++){
            if(arr[j].ticker===unique[i]){
              totalCost+=arr[j].cost*arr[j].quantity;
              totalq+=arr[j].quantity;
            }
          }
          if (unique[i] !=='CASH'){
          output.push({ticker:unique[i],quantity:totalq, cost:totalCost/totalq});
      }
    }
      return output
    };

    function redirectToLogin() {
    props.history.push('/login');
    }
    //const tickerArr=['AAPL','NVDA','TSLA','AMZN','QQQ','SPY','SHOP']

    return(
      // <div className="row-12">
      <Card.Group> 
        <div className='container'>
            
            <div className='row'>
            {tickers.map(ticker => (
              <div className='col-md-12' style={{borderStyle:'solid', marginTop:'10px',height:'10%',marginRight:'10px'}}>
                  <TradeForm ticker={ticker} key={ticker}/>
                  </div>
                ))}
            </div>
            <div className='row'>
            {<div className='col-md-12' style={{borderStyle:'solid', marginTop:'10px',height:'10%',marginRight:'10px'}}>
                  <TradeFormEmpty key={'empty'}/>
                  </div>}
            </div>
            </div>
       </Card.Group>     

    )
}

export default withRouter(Trade);