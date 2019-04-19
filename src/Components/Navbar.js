import React from 'react';
import Searchbar from './Searchbar';

import styles from './Navbar.module.css';

const Navbar = ({routeProps}) => {
    const historyProps = routeProps;

    return (
        <nav className={styles.navbar}>
            <a href='/' className={styles.logo}>LOGO</a>
            <Searchbar routeProps={historyProps} />
        </nav>
    )
}

export default Navbar;