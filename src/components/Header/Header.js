import "./Header.css";
import { Link } from 'react-router-dom'
function Header() {
    return (
        <header className="Header">
           <div className="container HeaderContainer">
               <div className="Brand">
                   <Link to="/" className="Title">LAGS Word Guesser</Link>
               </div>
               <div className="Navigation">
                   {!localStorage.getItem('isAuthenticated') && (
                    <ul className="NavList">
                       <li className="NavItem"><Link to="/login" className="NavLink">Login</Link></li>
                       <li className="NavItem"><Link to="/register" className="NavLink">Register</Link></li>
                   </ul>
                   )}
               </div>
           </div> 
        </header>
    )
}

export default Header
