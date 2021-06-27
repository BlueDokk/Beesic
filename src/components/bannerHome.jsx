import React from 'react';
import homePng from '../assets/images/home.png';
import homePng2x from '../assets/images/home@2x.png';
import homeWebp from '../assets/images/home.webp';
import homeWebp2x from '../assets/images/home@2x.webp';

const BannerHome = () => {
    return (
        <div className="block-welcome">
            <picture>
                <source type="image/webp"
                    srcSet={`${homeWebp} 1x, ${homeWebp2x} 2x`} />
                <source type="image/png"
                    srcSet={`${homePng} 1x, ${homePng2x} 2x`} />
                <img className="block-home__image" src={homePng} alt="" />
            </picture>
            <h3 className="text-center">Create, listen and enjoy</h3>
            <p className="text text-center">Login to your account and create your lists.</p>
        </div>
    )
}

export default BannerHome;
