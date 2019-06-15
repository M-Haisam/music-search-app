import React, { Component } from 'react';

import styles from './SimilarArtists.module.css';

class SimilarArtists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.fetchData = this.fetchData.bind(this);
        this.animateToTop = this.animateToTop.bind(this);
    };

    handleClick = (query) => {
        const params = new URLSearchParams();
        params.set('q', query);
        const url = params.toString();

        this.props.routeProps.push('/results?' + url);
        this.animateToTop();
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

    animateToTop = () => {
        var scrollToTop = setInterval(function() {
            var position = window.pageYOffset;
            if (position > 0) {
                window.scrollTo(0, position - 20);
            } else {
                clearInterval(scrollToTop);
            }
        }, 1);
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
            backgroundImage: 'url('+artist.image[2]['#text']+')'
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
                <ul>
                    { artists }
                </ul>
            </section>
        )
    }
}

export default SimilarArtists;