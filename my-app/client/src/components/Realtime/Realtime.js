import React,{ useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'

import API from '../../utils/API'
import UserContext from  "../../utils/UserContext";

function Realtime(props) {
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

    const ctx = document.getElementById("myChart1").getContext("2d");
    
    return(
    //     <div className="mt-2">
    //       <h1>Hello {user}, here are your positions: </h1>
    //         <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Symbol</TableCell>
    //         <TableCell align="right">Price</TableCell>
    //         <TableCell align="right">Gain&nbsp;(%)</TableCell>
    //         <TableCell align="right">Quantity</TableCell>
    //         <TableCell align="right">Cost</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow key={row.symbol}>
    //           <TableCell component="th" scope="row">
    //             {row.symbol}
    //           </TableCell>
    //           <TableCell align="right">{row.price}</TableCell>
    //           <TableCell align="right">{row.gain}</TableCell>
    //           <TableCell align="right">{row.quantity}</TableCell>
    //           <TableCell align="right">{row.cost}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    //     </div>

<div className="container">
<div className="row">
  <div className="col-md-6 col-md-offset-3">
    <h2>Thank you for taking the Survey! Here are some statistics of all the Resdpndents:<span class="member-name"></span></h2>
  </div>
</div>
<div className="row">
  <canvas id="myChart1" width="400" height="400"></canvas>
</div>
<form className="next">
  <button type="submit" className="btn btn-default">Next Plot</button>
</form>
</div>
    )
}

export default withRouter(Realtime);