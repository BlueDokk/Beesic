import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import spotifyService from '../services/spotifyService';
import InputSeach from './common/inputSearch';
import Card from './Card';
import BlockUser from './blockUser';
import BannerHome from './bannerHome';

const Home = (props) => {

    // Set initial new releases value.
    const [newReleases, setNewReleases] = useState('');

    // Set initial search term value
    const [searchTerm, setSearchTerm] = useState({});

    // Set initial artist value.
    const [artist, setArtist] = useState({});

    // Get user data from local storage.
    const user = JSON.parse(localStorage.getItem('user')) || {};

    // Get new releases from the spotify api.
    useEffect(() => {
        spotifyService.getNewReleases().then(releasesResponse => {
            setNewReleases(releasesResponse.data.albums.items);
            // console.log(releasesResponse.data.albums.items);
        })
    }, [])

    const handleChange = ({ target }) => {
        setSearchTerm(target.value);
    };

    const handleSearch = (event) => {

        if (event.key === 'Enter' || event.type === 'click') {
            spotifyService.searchArtist(searchTerm)
                .then(artistResponse => {
                    setArtist(artistResponse.data.artists.items);
                })
        }
    };

    const handleCard = (e)=>{

        
        const artistId=e.currentTarget.id;
        props.history.push(`/home${artistId}`)

    };

    return (

        <React.Fragment>
            {Object.keys(user).length === 0 && <BannerHome />}
            {Object.keys(user).length !== 0 && <BlockUser user={user} />}
            <div className="block-home">
                <InputSeach
                    handleChange={handleChange}
                    handleSearch={handleSearch}
                />
                {Object.keys(searchTerm).length === 0 && <p className="text block-home__text">New Releases</p>}
                {Object.keys(searchTerm).length !== 0 && <p className="text block-home__text">Search: "{searchTerm}"</p>}
                {Object.keys(searchTerm).length === 0 && <div className="row row-cols-2 row-cols-md-5 g-4">
                    {Object.keys(newReleases).map(function (key) {
                        const release = newReleases[key];

                        return <Card
                            key={key}
                            id={release.type !== 'artist'? release.artists[0].id:release.id}
                            image={release.images[0].url}
                            title={release.name}
                            badges={release.artists}
                            aditionalInformation={`Date: ${release.release_date}`} 
                            onClick={handleCard}
                            />;
                    })}</div>}
                {Object.keys(searchTerm).length !== 0 && <div className="row row-cols-2 row-cols-md-5 g-4">
                    {Object.keys(artist).map(function (key) {
                        const item = artist[key];
                        return <Card
                            key={key}
                            id={item.type !== 'artist'? item.artists[0].id:item.id}
                            image={item.images[0] ? item.images[0].url : null}
                            title={item.name}
                            badges={(item.genres.length !== 0) ? item.genres : ['Unknown genre']} 
                            aditionalInformation={`Popularity: ${item.popularity}`}
                            onClick={handleCard}
                            />;
                    })}</div>}
            </div>


        </React.Fragment>
    )
}
export default withRouter(Home);

