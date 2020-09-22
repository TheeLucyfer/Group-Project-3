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

function Transactions(props) {
  const { user} = useContext(UserContext);
  const [userPositions,setUserPositions] =useState([]);
  
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
       setUserPositions(data);

   })
        })
        .catch(function (error) {
          redirectToLogin()
        });
      },[])


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
          <h1>Hello {user}, here are your transactions: </h1>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userPositions.map((row) => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">
                {row.ticker}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default withRouter(Transactions);