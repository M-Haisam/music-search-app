import React, { Component } from 'react';
import ArtistImage from './ArtistImage';
import Video from './Video';

import _Loader from 'react-loader-spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './Tracks.module.css';

class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            trackName: '',
            isLoading: false
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick = (track) => {
        this.setState({
            trackName: track
        });
    }

    fetchData = () => {
        let query = encodeURIComponent(this.props.query);
        query = query.split('%20').join('+');
        const url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + query + "&api_key=0a69994bb150786ab25f611187931d88&format=json&limit=15";
        this.setState({
            isLoading: true
        });
        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result.toptracks.track,
                    isLoading: false
                });
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.query !== prevProps.query) {
            this.fetchData();
        };
    }

    render() {

        const {data} = this.state;
        if (data.length !== 0) {
            var imgSrc = data[0].image[3]['#text'];
            var artistName = data[0].artist.name;
        }

        const tracks = data.map((track, index) => {
            return (
                <li className={styles.track} key={index} onClick={() => this.handleClick(track.name)}>
                    {track['@attr'].rank} 
                    <FontAwesomeIcon icon={faPlay} className={styles['play-icon']}></FontAwesomeIcon>
                    <span className={styles.span}>{track.name}</span>
                </li>
            )
        });


        return (
            <section className={styles.main}>
                
                    {this.state.isLoading ? 
                        <div className={styles['spinner-container']}><_Loader 
                            type="Oval"
                            color="red"
                            height="100"	
                            width="100" /> 
                        </div> : 
                        
                        <div className={styles['inline-container']}>
                            <h1 className={styles.heading}>{artistName}</h1>
                            <ul className={styles.list}>
                                { tracks }
                            </ul>
                            <img src={imgSrc} className={styles.image}></img>
                        </div>
                    }

                    <Video artistName={artistName} trackName={this.state.trackName} />     

            </section>
        )
    }
}

export default Tracks;