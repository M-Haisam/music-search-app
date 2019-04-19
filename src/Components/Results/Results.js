import React from 'react';
import Navbar from '../Navbar';
import Tracks from './Tracks';
import SimilarArtists from './SimilarArtists';
import ArtistInfo from './ArtistInfo';

import styles from './Results.module.css';

const Results = ({history}) => {

    const getParams = () => {
        const searchParams = new URLSearchParams(document.location.search);
        const query = searchParams.get('q');
        return query;
    }

    const historyProps = history;
    // console.log(historyProps);

    return (
        <React.Fragment>
            <Navbar routeProps={historyProps} />

            <div className={styles.container}>
                <ArtistInfo query={getParams()} />
                <hr></hr>
                <Tracks query={getParams()} />
                <SimilarArtists query={getParams()} routeProps={historyProps} />       
            </div>
        </React.Fragment>
    );
}

export default Results;