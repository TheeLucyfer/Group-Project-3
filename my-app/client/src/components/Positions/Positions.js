import React,{ useEffect, useContext ,useState} from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import API from '../../utils/yahooAPI'
import UserContext from  "../../utils/UserContext";

function Positions(props) {
  const { user} = useContext(UserContext);
  const [userPositions,setUserPositions] =useState([]);

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

       console.log('data',response.data)
       setUserPositions(response.data);
       console.log('userPositions',userPositions);
       const data=response.data;
       const mergedArr=mergeArr(data);
       console.log('uniq',mergedArr)
       const rows = mergedArr.map((item)=>{
        return createData(item.ticker, item.quantity, item.cost)}
       );
       console.log('rows',rows);
       setUserPositions(rows);

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
          output.push({ticker:unique[i],quantity:totalq, cost:totalCost/totalq});
      }
      return output
    };



    function redirectToLogin() {
    props.history.push('/login');
    }
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });

    
    function createData(symbol, quantity, cost) {
      const price=API.getCurrPrice(symbol);
      const gain=(100.*(price-cost)/cost).toFixed(2);
      return { symbol, price, gain, quantity, cost }};
    
    const classes = useStyles();
    const rows=[createData('AAPL',10,100.0)]

    return(
        <div className="mt-2">
          <h1 style={{color:'white'}}>Hello {user}, here are your positions: </h1>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Gain&nbsp;(%)</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userPositions.map((row) => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.gain}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.cost.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default withRouter(Positions);