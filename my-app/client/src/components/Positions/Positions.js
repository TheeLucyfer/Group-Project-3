import React,{ useEffect, useContext } from 'react';
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
import API from '../../utils/API'
import UserContext from  "../../utils/UserContext";

function Positions(props) {
  const { user} = useContext(UserContext);
  console.log('Hello,',user)
  
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
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    
    function createData(symbol, quantity, cost) {
      //API.getPrice(symbol).then(res=>{
      const price=API.getPrice(symbol);
      const gain=(100.*(price-cost)/cost).toFixed(2);
      return { symbol, price, gain, quantity, cost }};
    
    const classes = useStyles();
    const rows = [
      createData('AAPL', 10, 115.3),
      createData('Gingerbread', 356, 16.0, 3.9),
    ];


    return(
        <div className="mt-2">
          <h1>Hello {user}, here are your positions: </h1>
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
          {rows.map((row) => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.gain}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default withRouter(Positions);