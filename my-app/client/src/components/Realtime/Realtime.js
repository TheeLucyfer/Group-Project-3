import React, { useEffect, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'

import API from '../../utils/yahooAPI'
import UserContext from "../../utils/UserContext";
import LineChart from "../LineChart/LineChart"

function Realtime(props) {
  const { user } = useContext(UserContext);
  const [userPositions,setUserPositions] =useState([]);
  console.log('Hello,', user)

  useEffect(() => {
    let timerId;
    axios.get(API_BASE_URL + '/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) } })
      .then(function (response) {
        if (response.status !== 200) {
          redirectToLogin()
        }

    //     axios.get(API_BASE_URL+'/api/positions/'+user)
    //     .then(function (response2) {
    
    //        const data=response2.data;
    //        const mergedArr=mergeArr(data);
    //        console.log('uniq',mergedArr)
    //        setUserPositions(mergedArr);
    
    //    }).catch(function (error) {
    //           redirectToLogin()
    //         });
      // setUserPositions([{ticker:'AAPL'},{ticker:'TSLA'}]);
      timerId = window.setInterval(() => {
          setLineData({
            feeds: getFeeds()
          })
        }, 1000)
      })
      .catch(function (error) {
        redirectToLogin()
      });
    return () => clearTimeout(timerId);
  })


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
        output.push({ticker:unique[i],quantity:totalq, cost:totalCost/totalq});
    }
    return output
  };

  function redirectToLogin() {
    props.history.push('/login');
  }

  function getRandomArray(numItems) {
    // Create random array of objects
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for (var i = 0; i < numItems; i++) {
      data.push({
        label: names[i],
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }

  function getRandomDateArray(numItems) {
    // Create random array of objects (with date)
    let data = [];
    let baseTime = new Date('2018-05-01T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for (var i = 0; i < numItems; i++) {
      data.push({
        time: new Date(baseTime + i * dayMs),
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }

  function getFeeds() {
    let feeds = [];

    feeds.push({
      title: 'Price',
      data: getRandomDateArray(150)
    });

    feeds.push({
      title: 'Categories',
      data: getRandomArray(20)
    });

    feeds.push({
      title: 'Categories',
      data: getRandomArray(10)
    });

    feeds.push({
      title: 'Data 4',
      data: getRandomArray(6)
    });

    return feeds;
  }

  const [LineData, setLineData] = useState(
    {
      feeds: getFeeds()
    });

  return (
    <div className="main chart-wrapper" style={{ width: "80%", background: "white" }}>
      <select name="cars" id="cars">
      {['AAPL','TSLA'].map(ticker => (
              
                  <option value={ticker} >{ticker}</option>
 
                ))}
      </select>
      <LineChart
        data={LineData.feeds[0].data}
        title={LineData.feeds[0].title}
        color="#3E517A"
      />
    </div>
  )
}

export default withRouter(Realtime);