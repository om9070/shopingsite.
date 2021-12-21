import React from 'react'
import { Link } from 'react-router-dom';

const heading = () => {
    return (
        <>
            <div className="wrapper">
                <nav>
                    <input type="checkbox" id="show-search" />
                    <input type="checkbox" id="show-menu" />
                    <label for="show-menu" className="menu-icon"><i className="fas fa-bars"></i></label>
                    <div className="content">
                        <div className="logo">E-Commerce</div>
                        <ul className="links">
                            <li>  <Link className="nav-link active" to="/">Home</Link></li>
                            <li>  <Link className="nav-link active" to="/order">Your Order</Link></li>
                            <li>  <Link className="nav-link active" to="/profile">Profile</Link></li>
                            <li>  <Link className="nav-link active" to="/log">Register</Link></li>
                            <li>  <Link className="nav-link active" to="/out" >Log_out</Link></li>


                            {/* <li>Your Order</li>
                            <li>Register</li>
                            <li>profile</li> */}
                        </ul>
                    </div>
                    <label for="show-search" className="search-icon"><i className="fas fa-search"></i></label>
                    <form className="search-box">
                        <input type="text" placeholder="Type Something to Search..." required />

                    </form>
                </nav >
            </div >


        </>
    )
}
export default heading;