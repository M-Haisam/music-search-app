import React from 'react';
import Navbar from '../Navbar';
import Tracks from './Tracks';
import SimilarArtists from './SimilarArtists';

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
            <Tracks query={getParams()} />
            <SimilarArtists query={getParams()} routeProps={historyProps} />  
        </React.Fragment>
    );
}

export default Results;