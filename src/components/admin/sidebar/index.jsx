import React, { useState } from "react";
import './adminstyle.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup , faShop , faUser , faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    return (
        <>
            <div className="adminsidebar">
                <div className="company-title mb-4">
          <span>electric</span>
          <br />
          products
        </div>
                <ul>
                    <li
                        className={activeItem === 'users' ? 'active' : ''}
                        onClick={() => handleItemClick('users')}
                    >
                        <Link className="adminsidebarselectitem" to="#">
                            <FontAwesomeIcon icon={faUser} /> &nbsp; Users
                        </Link>
                    </li>
                    <li
                        className={activeItem === 'categories' ? 'active' : ''}
                        onClick={() => handleItemClick('categories')}
                    >
                        <Link className="adminsidebarselectitem" to="#">
                            <FontAwesomeIcon icon={faLayerGroup} /> &nbsp; Categories
                        </Link>
                    </li>
                    <li
                        className={activeItem === 'products' ? 'active' : ''}
                        onClick={() => handleItemClick('products')}
                    >
                        <Link className="adminsidebarselectitem" to="#">
                            <FontAwesomeIcon icon={faShop} /> &nbsp; Products
                        </Link>
                    </li>
                    <li
                        className={activeItem === 'orders' ? 'active' : ''}
                        onClick={() => handleItemClick('orders')}
                    >
                        <Link className="adminsidebarselectitem" to="#">
                            <FontAwesomeIcon icon={faShoppingBag} /> &nbsp; Orders
                        </Link>
                    </li>
                    <li
                        className={activeItem === 'logout' ? 'active' : ''}
                        onClick={() => handleItemClick('logout')}
                    >
                        <Link className="adminsidebarselectitem" to="#">
                            <FontAwesomeIcon icon={faSignOut} /> &nbsp; Log out
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default AdminSidebar;
