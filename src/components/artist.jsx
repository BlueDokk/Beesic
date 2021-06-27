import React, { useState, useEffect } from 'react';
import spotifyService from '../services/spotifyService';
import logoV from '../assets/images/logo-v.png';

const Artist = ({ match, history }) => {

    // Set initial data artist value.
    const [dataArtist, setDataArtist] = useState({});

    // Set initial tracks value.
    const [tracksArtist, setTracksArtist] = useState([]);

    useEffect(() => {

        // Get artist id by route parameters
        const artistId = match.params.id;

        // Get artist data.
        spotifyService.getArtist(artistId)
            .then((artistResponse) => {
                setDataArtist(artistResponse.data)
                // console.log(artistResponse.data);
            });

        // Get top ten of the artist's songs.
        spotifyService.getTopTracks(artistId)
            .then((tracksResponse) => {
                setTracksArtist(tracksResponse.data.tracks)
                console.log(tracksResponse.data.tracks);
            });

    }, [match.params.id]);

    const handleBack = () => {

        history.push('/home');
    }

    return (
        <div className="row ms-5 me-5">
            {Object.keys(dataArtist).length !== 0 &&
                <div className="artist-header row">
                    <div className="col"><img className="artist-img" src={dataArtist.images[0]? dataArtist.images[0].url:logoV} alt="Artist" /></div>
                    <div className="col">
                        <h2 className="artist-title ms-5">{dataArtist.name}</h2>
                        {dataArtist.genres.map((genre, key) => {
                            return <span key={key} className="badge rounded-pill bg-secondary">{genre}</span>
                        })}
                        <p className="text ms-5">Followers: {dataArtist.followers.total}</p>
                        <button onClick={handleBack} className="btn btn-accent btn-back">Back</button>
                    </div>
                </div>}
            <div className="artist-body row">
                <hr></hr>
                {tracksArtist.length !== 0 && <table className="table table-dark">
                    <thead>
                        <tr className="text">
                            <th>#</th>
                            <th className="">Photo</th>
                            <th>Song</th>
                            <th className="">Album</th>
                            <th>Preview</th>
                        </tr>
                    </thead>
                    <tbody>

                        {tracksArtist.map((track, key) => {
                            return (<tr key={key}>
                                <td>{key + 1}</td>
                                <td className=""><img className="album-img" src={track.album.images[0].url} alt="" /></td>
                                <td className="text">{track.name}</td>
                                <td className="text ">{track.album.name}</td>
                                <td>
                                    <audio src={track.preview_url} controls className="d-block d-md-none"></audio>
                                    <iframe src={`https://open.spotify.com/embed/track/${track.id}`} className="d-none d-md-block" width="300" height="80" allowtransparency="true" allow="encrypted-media"></iframe>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>}


            </div>
        </div>
    )
}

export default Artist;
