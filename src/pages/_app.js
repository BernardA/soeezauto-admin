/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import withReduxSaga from 'next-redux-saga';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import wrapper from 'store/reduxWrapper';
import theme from 'styles/theme';
import 'styles/globals.css';
import Layout from 'components/layout';
import Loading from 'components/std/loading';

function MyApp(props) {
    const { Component, pageProps, cookies } = props;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        if (!cookies.get('isAdmin') && router.asPath !== '/login') {
            router.push('./login');
        }
    }, []);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setIsLoading(true);
        };
        const handleRouteChangeComplete = (url) => {
            setIsLoading(false);
            if (!cookies.get('isAdmin') && url !== '/login') {
                router.push('/login');
            }
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router, cookies]);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <Component {...pageProps} />
                    {isLoading ? <Loading /> : null}
                </Layout>
            </ThemeProvider>
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default wrapper.withRedux(withReduxSaga(withCookies(MyApp)));
