import axios from "axios";

export default {
  
  getChart: function(ticker) {
    return axios({
      "method":"GET",
      "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key":"c4e5d2b842msh6cffedf191a26dfp159c71jsn2ec40e87511b",
      "useQueryString":true
      },"params":{
      "region":"US",
      "comparisons":"%5EGDAXI%2C%5EFCHI",
      "symbol":ticker,
      "interval":"5m",
      "range":"1d"
      }
      });
  },
 
  // getCurrPrice: function(ticker) {
  //   axios({
  //     "method":"GET",
  //     "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes",
  //     "headers":{
  //     "content-type":"application/octet-stream",
  //     "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
  //     "x-rapidapi-key":"69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a",
  //     "useQueryString":true
  //     },"params":{
  //     "symbols":ticker,
  //     "region":"US"
  //     }
  //     })
  //   .then(res =>{
  //     // console.log(res)
  //     const result=res.data.quoteResponse.result[0].regularMarketPrice;
  //     console.log(ticker,' price ', result)
  //     return result;
  //   })
  // },  

  // getCurrPrice: async function(ticker) {
  //   const response = await axios({
  //     "method":"GET",
  //     "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes",
  //     "headers":{
  //     "content-type":"application/octet-stream",
  //     "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
  //     "x-rapidapi-key":"69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a",
  //     "useQueryString":true
  //     },"params":{
  //     "symbols":ticker,
  //     "region":"US"
  //     }
  //     })
    
  //   return response.data.quoteResponse.result[0].regularMarketPrice;
  // },  

  getCurrPrice:function(symbol){
    return Math.round(20 + 80 * Math.random())
  },
  getMovers: function(){

    return axios({
      "method":"GET",
      "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key":"c4e5d2b842msh6cffedf191a26dfp159c71jsn2ec40e87511b",
      "useQueryString":true
      },"params":{
      "region":"US",
      "start":"0",
      "lang":"en-US",
      "count":"6"
      }
      })

  },
  getPresetQ:function(props){
    //Retrive the preset quantity for this user for a given ticker
    return 10;
  }
};
