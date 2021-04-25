import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import HeaderLogo from './bbo_headerLogo.jpeg'
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';


function Header() {
    const [{basket, user}] = useStateValue();

    //handle authentication of user
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div class='header'>
            <Link to="/">
                <img src={HeaderLogo} alt="logo_img" className="header_logo"/>
            </Link>
            
            <div class="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className='header_searchIcon' />
            </div>


            <div className="header_nav">
                <Link  to={!user && '/login'}>
                    <div onClick={handleAuthentication} className = 'header_option'>
                        <span className = 'header_optionLineOne'>{user ? user.email : 'Hello Guest'}</span>
                        <span className = 'header_optonLineTwo'>{user ? 'Sign out' : 'Sign In'}</span>
                    </div>
                </Link>
                                
                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
        
    )
}

export default Header
