import React, { Component } from 'react';

import styles from './SimilarArtists.module.css';

class SimilarArtists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.fetchData = this.fetchData.bind(this);
    };

    handleClick = (query) => {
        const params = new URLSearchParams();
        params.set('q', query);
        const url = params.toString();

        this.props.routeProps.push('/results?' + url);
    }

    fetchData = () => {
        let query = encodeURIComponent(this.props.query);
        query = query.split('%20').join('+');
        const url = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + query + "&api_key=0a69994bb150786ab25f611187931d88&format=json&limit=7";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result.similarartists.artist
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
        const artists = data.map((artist, index) => {
        
            const backgroundStyle = {
            backgroundImage: 'url('+artist.image[2]['#text']+')',
            backgroundSize: 'cover'
            }
            return (
                <li key={index} style={backgroundStyle} className={styles.artist} onClick={() => this.handleClick(artist.name)}>
                    <div className={styles['list-container']}>
                        <p className={styles.text}>
                            {artist.name}
                        </p>
                    </div>
                </li>
            )
        });

        return (
            <section className={styles.container}>
                <h2 className={styles.heading}>Similar Artists</h2>
                <ul className={styles.container}>
                    { artists }
                </ul>
            </section>
        )
    }
}

export default SimilarArtists;