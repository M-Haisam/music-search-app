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
        const url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + query + "&api_key=0a69994bb150786ab25f611187931d88&format=json&limit=10";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result.toptracks.track
                });
            });
    }

    // handleClick = () => {

    // }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.query !== prevProps.query) {
            this.fetchData();
        }
    }

    render() {
        // const {query} = this.props;
        // console.log(this.state.trackName);
        const {data} = this.state;
        const tracks = data.map((track, index) => {
            return (
                <li className={styles.track} key={index} onClick={() => this.handleClick(track.name)}>
                    {track['@attr'].rank} 
                    <span className={styles.span}>{track.name}</span>
                </li>
            )
        });


        return (
            <section className={styles.container}>
                <h2 className={styles.heading}>Top Tracks</h2>
                <div className={styles.inline}>
                    <ul className={styles.list}>
                        { tracks }
                    </ul>
                    <Video trackName={this.state.trackName}/>
                </div>
            </section>
        )
    }
}

export default Tracks;