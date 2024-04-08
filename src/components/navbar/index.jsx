import React , {useState , useEffect} from "react";
import style from "./style.module.css"
import { Link } from "react-router-dom";
import './navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHeart , faUserPlus , faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Wishlist from "../../pages/user/wishlist";

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    return(
        <>
    <div className="navbar2">
    <div className="nav-links">
        <Link className="navlink" to="/">Home</Link>
        <Link className="navlink" to="/products">Products</Link>
        <Link className="navlink" to="#">Services</Link>
        <Link className="navlink" to="#">About Us</Link>
        <Link className="navlink" to="#">Contact</Link>
    </div>
    <div className="company-title">
        <span>electric</span><br />products
    </div>
    <div className="auth-buttons">
        <div className="auth-fields1">
        <input type="text" className="form-control" placeholder="search...." />
        <button className="navbutton1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        </div>
        <div className="notificationparent">
        <div className="notification">0</div>
        <button className="navbutton2" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faShieldHeart} />
        </button>
        </div>
        <button className="navbutton3"><FontAwesomeIcon icon={faUserPlus} /></button>
    </div>
    </div>
    <Wishlist isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </>
    );
}

export default Navbar