import React from 'react';
import sprite from '../../assets/images/icons/sprite.svg';

const InputSearch = ({ handleChange, handleSearch }) => {

    return (
        <div className="block-search">
            <input className="input-search"
                placeholder="Search artist, song or list"
                onChange={handleChange}
                onKeyDown={handleSearch}
            />
            <svg className="icon-search" onClick={handleSearch}>
                <use href={`${sprite}#search-solid`}></use>
            </svg>
        </div>
    )
}

export default InputSearch;