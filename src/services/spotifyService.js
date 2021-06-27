import axios from 'axios';
import credentials from '../utils/credentials';

// Spotify credentials.
const spotify = credentials();

// Get spotify token from localStorage.
const token = localStorage.getItem('token');

const spotifyService = {

    async getToken(){
        return await axios('https://accounts.spotify.com/api/token', {
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(spotify.clientId + ':' + spotify.clientSecret)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
    },

    async getNewReleases(){

        return await axios('https://api.spotify.com/v1/browse/new-releases', {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
    },

    async searchArtist(artist){

        return await axios(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
    }, 

    async getArtist(artistId){

        return await axios(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
    },

    async getTopTracks(artistId){
        return await axios(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=us`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        })
    }


};

export default spotifyService;