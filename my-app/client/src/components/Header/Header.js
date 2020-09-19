import React,{ useContext } from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import UserContext from  "../../utils/UserContext";
import "./style.css";

function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const { user} = useContext(UserContext);
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length));
    console.log(user);
    if(props.location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        const pathNow=props.location.pathname;

        if((pathNow !== '/login') && (pathNow !=='/register')){ //props.location.pathname === '/home'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        props.setUser(null);
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        props.history.push('/login')
    }
    return(
        <nav className="navbar navbar-dark test">
            <div className="row col-12 d-flex justify-content-center text-white test">
                <span className="h3">{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);