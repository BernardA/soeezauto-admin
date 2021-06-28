import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import Link from './std/link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    linkContainer: {
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'initial',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
    },
    nav: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    headerTop: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#ffc107',
        height: '60px',
        '& > div': {
            display: 'flex',
            '& > *': {
                margin: '0 10px',
            },
        },
    },
    branding: {
        width: 180,
        height: 60,
        fontSize: 35,
        fontWeight: 800,
        color: '#fff',
        lineHeight: '60px',
        textAlign: 'center',
    },
    menuIcon: {
        height: '60px',
        width: '40px',
        color: '#fff',
        cursor: 'pointer',
    },
}));

export default function Header() {
    const classes = useStyles();

    return (
        <>
            <header>
                <div className={classes.headerTop}>
                    <Link href="/" aria-label="visiter page accueil">
                        <p className={classes.branding}>soeezAuto</p>
                    </Link>
                </div>
            </header>
        </>
    );
}

Header.propTypes = {};
