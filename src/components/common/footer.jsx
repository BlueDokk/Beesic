import React from 'react'
import logoPng from '../../assets/images/logo.png';
import logoPng2x from '../../assets/images/logo@2x.png';
import logoWebp from '../../assets/images/logo.webp';
import logoWebp2x from '../../assets/images/logo@2x.webp';

const Footer = () => {
    return (
        <footer className="footer">
            <picture>
                <source type="image/webp"
                    srcSet={`${logoWebp} 1x, ${logoWebp2x} 2x`} />
                <source type="image/png"
                    srcSet={`${logoPng} 1x, ${logoPng2x} 2x`} />
                <img className="footer__logo" src={logoPng} alt="Logo Beesic" />
            </picture>
            <p className="text">Copyright © 2021 Beesic</p>
        </footer>
    )
}

export default Footer;


