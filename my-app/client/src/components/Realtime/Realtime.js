import React, { useEffect, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'

import API from '../../utils/API'
import UserContext from "../../utils/UserContext";
import LineChart from "../LineChart/LineChart"
function Realtime(props) {
  const { user } = useContext(UserContext);

  console.log('Hello,', user)

  useEffect(() => {
    axios.get(API_BASE_URL + '/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) } })
      .then(function (response) {
        if (response.status !== 200) {
          redirectToLogin()
        }
        window.setInterval(() => {
          setLineData({
            feeds: getFeeds()
          })
        }, 10000)
      })
      .catch(function (error) {
        redirectToLogin()
      });
  })
  function redirectToLogin() {
    props.history.push('/login');
  }

  function getRandomArray(numItems) {
    // Create random array of objects
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for(var i = 0; i < numItems; i++) {
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
    for(var i = 0; i < numItems; i++) {
      data.push({
        time: new Date(baseTime + i * dayMs),
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }

  // function getRandomDateArray(numItems) {
  //   // Create random array of objects (with date)
  //   let data = [];
  //   var baseTime = new Date();
  //   let dayMs = 24 * 60 * 60 * 1000;
  //   for(var i = 0; i < numItems; i++) {
  //     data.push({
  //       time: new Date(baseTime + i * dayMs),
  //       value: Math.round(20 + 80 * Math.random())
  //     });
  //   }
  //   return data;
  // }
  function getFeeds() {
    let feeds = [];

    feeds.push({
      title: 'Visits',
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
    <div className="main chart-wrapper" style={{width:"80%"}}>
      <LineChart
        data={LineData.feeds[0].data}
        title={LineData.feeds[0].title}
        color="#3E517A"
      />
    </div>
  )
}

export default withRouter(Realtime);