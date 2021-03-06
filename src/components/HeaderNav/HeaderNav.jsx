
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './HeaderNav.module.scss';
import { ReactComponent as UserSvg } from '../../assets/svgs/user.svg';
import { ReactComponent as CartSvg } from '../../assets/svgs/shopping-cart.svg';
import { ReactComponent as SearchSvg } from '../../assets/svgs/search.svg';

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";



export default function HeaderNav({ type, heroBottom, tl}) {

    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();


    const handleScroll = () => {
        const offset = window.pageYOffset;
        offset > heroBottom ? setScrolled(true) : setScrolled(false);
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollToPlugin);

        if (type === 'hero') {

            // tl.from('#nav', {y:'-100%', ease: 'Power3.out'})

            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [heroBottom]);

    const animateNav = type => {
        if (type === 'hero') {
            return scrolled ? styles.fixed : styles.hero
        }
    };

    const scrollToTop = () => {
        gsap.to(window, { duration: 2.2, ease: 'slow(0.1, 0.1, false)', scrollTo: (0,0)})  
    }

    return (
        <nav className={`${styles.nav} ${animateNav(type)}`} id='nav'>

            <Link to='/' className={styles.logo} onClick={scrollToTop}>
                Sneakers
                <span className={styles.logo4}>4</span>
                u
            </Link>


            <ul className={styles.linksContainer}>

                <li className={styles.links}>
                    <Link to='/'>Home</Link>
                </li>

                {/* This brings from aside the category selections list */}
                <li className={styles.links}>
                    <Link to='/away'>
                        {location.pathname === '/' ? 'Shop' : 'Search'}
                    </Link>
                </li>

                <li className={styles.links}>
                    {/* Once cliked should bring a page 
                    for login(With email or google/fb) OR
                    for Register (With email or google/fb)
             
                Once logged in. it should show the person's name. else Show login
             */}
                    <Link to='/'> Login
                        </Link>
                </li>

                <li className={styles.links}>
                    <span className={styles.cart}>
                        4
                        </span>
                </li>


                {/* <li>
            <Link to='/' component={Link}>Admin &#9660;</Link>
        </li> */}
            </ul>

            <div className={styles.mobileNav}>
                <span className={styles.cart}>
                    4
                </span>

                <button className={styles.hamburger}>
                    <span className={styles.icon}></span>
                </button>
            </div>
        </nav>
    )
}