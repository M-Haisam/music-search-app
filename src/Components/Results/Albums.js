import React, { Component } from 'react';

import styles from './Albums.module.css';

class Albums extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.fetchData = this.fetchData.bind(this);
    };

    fetchData = () => {
        const url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.props.query + "&api_key=0a69994bb150786ab25f611187931d88&format=json&limit=3";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result.topalbums.album
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
        // console.log(query);
        const {data} = this.state;
        const albums = data.map((album, index) => {
            return (
                <li className={styles.album} key={index}><img src={album.image[3]['#text']}></img></li>
            )
        });

        return (
            <section className={styles.container}>
                <h2 className={styles.heading}>Top Albums</h2>
                <ul>
                    { albums }
                </ul>
            </section>
        )
    }
}

export default Albums;