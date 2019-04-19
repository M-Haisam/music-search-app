import React, { Component } from 'react';

import styles from './ArtistInfo.module.css';

class ArtistInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.fetchData = this.fetchData.bind(this);
    };

    fetchData = () => {
        let query = encodeURIComponent(this.props.query);
        query = query.split('%20').join('+');
        const url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + query + "&api_key=0a69994bb150786ab25f611187931d88&format=json";

        // console.log(query);
        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result.artist
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
        // const {query} = this.props;
        const {data} = this.state;
        if (data.length !== 0) {
            var imgSrc = data.image[2]['#text'];
            var summary = data.bio.summary;
        }
        return (
            <section className={styles.container}>
                <img src={imgSrc} alt="Artist" className={styles.image}></img>
                <div className={styles['text-container']}>
                    <h1 className={styles.heading}>{data.name}</h1>
                    <p className={styles.text} dangerouslySetInnerHTML={{__html: summary}}></p>
                </div>
            </section>
        )
    }
}

export default ArtistInfo;