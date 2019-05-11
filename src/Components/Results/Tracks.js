import React, { Component } from 'react';
import Video from './Video';

import styles from './Tracks.module.css';

class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            trackName: ''
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

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result.toptracks.track
                });
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.query !== prevProps.query) {
            this.fetchData();
        }
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
                    <span className={styles.span}>{track.name}</span>
                </li>
            )
        });


        return (
            <section className={styles.main}>
                <div className={styles['inline-container']}>
                    <h1 className={styles.heading}>{artistName}</h1>
                    <ul className={styles.list}>
                        { tracks }
                    </ul>
                    <img src={imgSrc} alt="Artist" className={styles.image}></img>
                </div>
                <Video artistName={artistName} trackName={this.state.trackName} />
            </section>
        )
    }
}

export default Tracks;