import React from 'react';
import sprite from '../assets/images/icons/sprite.svg';
import logoV from '../assets/images/logo-v.png';


const Card = ({id,title, image, badges, aditionalInformation, onClick}) => {

    if(!image) image = logoV;

    return (
            
        <div id={id} onClick={onClick} className="col">
                <div className="card h-100">
                    <div className="card-img">
                        <img src={image} className="card-img-top" alt="..." />
                        <svg className="icon-play">
                            <use href={`${sprite}#play-circle-solid`}></use>
                        </svg>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        {badges.map((badge, key) => {
                            return <span key={key} className="badge rounded-pill bg-secondary">{badge.name? badge.name:badge}</span>
                        })}
                        <p className="text">{aditionalInformation} </p>
                    </div>
                </div>
        </div>
            
    )
}

export default Card;
