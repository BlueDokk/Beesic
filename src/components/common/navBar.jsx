import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import authService from '../../services/authService';
import firestoreService from '../../services/firestoreService';
import logoPng from '../../assets/images/logo.png';
import logoPng2x from '../../assets/images/logo@2x.png';
import logoWebp from '../../assets/images/logo.webp';
import logoWebp2x from '../../assets/images/logo@2x.webp';

const NavBar = ({ path }) => {

    // Set initial user value.
    const [user, setUser] = useState(null)

    useEffect(() => {

        // Get user data from local storage.
        const currentUser = JSON.parse(localStorage.getItem('user')) || null;
        if (currentUser) setUser(currentUser.id);
    }, [path]);

    // Logout method.
    const handleLogOut = () => {
        authService.logOut();
        localStorage.removeItem('user');
        setUser(null);

        // Redirect to login page.
        window.location.pathname = '/login';
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    <picture>
                        <source type="image/webp"
                            srcSet={`${logoWebp} 1x, ${logoWebp2x} 2x`} />
                        <source type="image/png"
                            srcSet={`${logoPng} 1x, ${logoPng2x} 2x`} />
                        <img src={logoPng} alt="Logo Beesic" />
                    </picture>

                </Link>
                <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/aboutus">About us</NavLink>
                        </li>
                        {!user && path !== '/login' && <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Log In</NavLink>
                        </li>}
                        {!user && path !== '/signup' && <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                        </li>}
                        {user && <li className="nav-item">
                            <NavLink className="nav-link" to="/login" onClick={handleLogOut}>LogOut</NavLink>
                        </li>}
                        {user && <li className="nav-item">
                            <NavLink className="nav-link" to="/login" onClick={() => {
                                firestoreService.deleteUser(user);
                                authService.deleteAccount();
                            }}>Delete Account</NavLink>
                        </li>}


                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;