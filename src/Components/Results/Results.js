import React from 'react';
import eruda from 'eruda';

import Navbar from '../Navbar';
import Tracks from './Tracks';
import SimilarArtists from './SimilarArtists';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

import styles from './Results.module.css';

const Results = ({history}) => {

    const getParams = () => {
        const searchParams = new URLSearchParams(document.location.search);
        const query = searchParams.get('q');
        return query;
    }

    const historyProps = history;
    // console.log(historyProps);
    eruda.init();

    return (
        <React.Fragment>
            {/* <script src="../../eruda.min.js"></script>
            <script>eruda.init();</script>
            <script src="../../hnl.mobileConsole.js"></script> */}
            <Navbar routeProps={historyProps} />
            <Tracks query={getParams()} />
            <SimilarArtists query={getParams()} routeProps={historyProps} />  
            <footer className={styles.footer}>
                <FontAwesomeIcon icon={faCopyright} className={styles['copyright-icon']}></FontAwesomeIcon>
                <small>2019 Music</small>
            </footer>
        </React.Fragment>
    );
}

export default Results;