import React from 'react';
import Searchbar from './Searchbar';

import styles from './Home.module.css';

const Home = ({history}) => {

    const historyProps = history;

    return (
        <React.Fragment>
            <main className={styles.main}>
                <div className={styles.layer}>
                    <h3 className={[styles.logo, styles.center].join(' ')}>LOGO</h3>
                    <div className={styles.container}>
                        <h1 className={styles.heading}>Listen to your favorite artists!</h1>
                        <Searchbar routeProps={historyProps} />
                        <p className={styles.text}>Powered by Last.FM</p>
                    </div>
                </div>
            </main>

        </React.Fragment>
    );
}

export default Home;