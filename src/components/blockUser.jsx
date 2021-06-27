import React from 'react';
import { Link } from 'react-router-dom';
import sprite from '../assets/images/icons/sprite.svg';


const BlockUser = ({user}) => {
    
    const {username, lastname} = user;
    
    return (
        
            <div className="block-user row animated fadeIn">
                <div className="col-md-5">
                    <svg className="icon-user">
                        <use href={`${sprite}#user-astronaut-solid`}></use>
                    </svg>
                    <div className="user">
                        <h2>{username} {lastname}</h2>
                        <p className="text">List numbers: </p>
                    </div>
                </div>
                <div className="user-options col-md-7 animated fadeIn">
                    <Link to="/mylists"><button type="button" className="btn btn-primary btn-options">My lists</button></Link>
                    <button className="btn btn-accent btn-options">Get Premium</button>
                </div>
            </div>
    )
}
export default BlockUser;