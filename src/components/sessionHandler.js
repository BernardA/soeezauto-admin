import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import axios from 'axios';
import localforage from 'localforage';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { Now } from 'tools/functions';
import { actionLogout, actionRefreshToken, actionGetUserProfile } from 'store/actions';
import {
    TOKEN_TTL,
    MAX_IDLE_TIME,
    IDLE_TIME_LOGOUT,
    COOKIE_MAX_AGE,
    COOKIE_SAME_SITE,
    LANG,
} from 'parameters';
import NotifierDialog from './std/notifierDialog';

const trans = {
    br: {
        security: 'Seguranca',
        sessionExpired: 'Sua sessao expirou. Favor entrar novamente',
        tokenError: 'Voce foi desconectado devido a um erro. Favor entrar novamente',
        idleWarning: 'Voce esteve inativo. Continuar sessao?',
        idleLogout: 'Voce foi desconectado por falta de atividade',
    },
    en: {
        security: 'Security',
        sessionExpired: 'Your session has expired. Please log back in',
        tokenError: 'You have been logged out due to token error. Please log back in',
        idleWarning:
            "You have been idle. You will be disconnected unless you choose 'Extend' below",
        idleLogout: 'You have been logged out due to lack of activity',
    },
};

// session timing is initiated at login.js by setting
// localforage.setItem('loggedInAt', Now());
// localforage.setItem('lastActiveAt', Now());
// user is active when:
// - navigating to another router.asPath
// - making a request to the server
// navigation updates indexeddb on componentDidUpdate below
// server requests updates indexeddb on sagas.js
// like so: localforage.setItem('lastActiveAt', Now());

class SessionHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveSessionDialog: false,
            isProfileRequestForMissingCookies: false,
            isLogout: false,
            notification: {
                status: '',
                title: '',
                message: '',
                errors: {},
            },
        };
    }

    componentDidMount() {
        // clear timeout just in case they were not cleated on componentWillUnmount
        clearTimeout(this.initialTimeout);
        clearTimeout(this.warningTimeout);

        // if user is remounting page and cookies still show as logged in
        // reset timeout and refetch user profile, mailbox
        const token = this.props.cookies.get('token') || null;
        if (token) {
            const tokenTTL = this.props.cookies.get('tokenTTL') || null;
            if (tokenTTL && Now() > parseInt(tokenTTL, 10)) {
                this.handleLogout();
                this.setState({
                    notification: {
                        status: 'ok_and_dismiss',
                        title: trans[LANG].security,
                        message: trans[LANG].sessionExpired,
                        errors: {},
                    },
                });
            } else {
                axios.defaults.headers.common = {
                    Authorization: `Bearer ${token}`,
                };
                this.initialTimeout = setTimeout(this.handleSessionStatus, 60 * 1000);
                // get user information if new window/tab
                const userId = this.props.cookies.get('userId') || null;
                if (userId) {
                    this.props.actionGetUserProfile(userId);
                }
            }
        }
    }

    componentDidUpdate(prevProps) {
        const prevToken = prevProps.token || null;
        const {
            router,
            isTokenExpired,
            errorRefreshToken,
            isLogoutInit,
            token,
            userId,
            userProfile,
            refreshToken,
        } = this.props;
        // set lastActiveAt when navigating in the app
        if (token && prevProps.router.asPath !== router.asPath) {
            localforage.setItem('lastActiveAt', Now());
        }
        // has logged in: set active and handleSession timeout
        if (!prevToken && token) {
            this.setCookies();
            localforage.setItem('lastActiveAt', Now());
            localforage.setItem('loggedInAt', Now());
            this.initialTimeout = setTimeout(
                this.handleSessionStatus,
                (MAX_IDLE_TIME - 60) * 1000,
            );
            this.props.actionGetUserProfile(userId);
        }
        // if refreshing token
        if (userId && prevProps.refreshToken && prevProps.refreshToken !== refreshToken) {
            this.setCookies();
        }
        // if changing user profile => PUT_USER_PROFILE_OK_NEW_TOKEN
        if (prevToken && token && prevToken !== token) {
            this.setCookies();
        }
        // if is tokenExpired, logout
        if (!prevProps.isTokenExpired && isTokenExpired) {
            this.setState({
                notification: {
                    status: 'ok_and_dismiss',
                    title: trans[LANG].security,
                    message: trans[LANG].sessionExpired,
                    errors: {},
                },
            });
            this.handleLogout();
        }
        // user initiated logout
        if (!prevProps.isLogoutInit && isLogoutInit) {
            this.handleLogout();
        }
        // if error refreshing token, logout
        if (!prevProps.errorRefreshToken && errorRefreshToken) {
            this.setState({
                notification: {
                    status: 'ok_and_dismiss',
                    title: trans[LANG].security,
                    message: trans[LANG].tokenError,
                    errors: {},
                },
            });
            this.handleLogout();
        }
        // got profile for missing info
        if (
            this.state.isProfileRequestForMissingCookies &&
            prevProps.userProfile !== userProfile
        ) {
            this.setCookies();
        }
        // scroll to top
        if (prevProps.router.asPath && prevProps.router.asPath !== router.asPath) {
            window.scrollTo({ top: 0, behavior: `smooth` });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.initialTimeout);
        clearTimeout(this.warningTimeout);
    }

    setCookies = () => {
        const { cookies, roles, username, userId, token, refreshToken } = this.props;
        if (!roles || !username || !userId) {
            const cookieUserId = cookies.get('userId') || null;
            if (cookieUserId) {
                this.props.actionGetUserProfile(cookieUserId);
                this.setState({ isProfileRequestForMissingCookies: true });
            } else {
                this.handleLogout();
            }
        } else {
            const isAdmin =
                roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN');
            const options = {
                path: '/',
                sameSite: COOKIE_SAME_SITE,
                secure: window.location.protocol === 'https',
                maxAge: COOKIE_MAX_AGE,
            };
            cookies.set('isAdmin', isAdmin, options);
            cookies.set('username', username, options);
            cookies.set('userId', userId, options);
            cookies.set('roles', roles, options);
            if (token) {
                cookies.set('token', token, options);
                cookies.set('tokenTTL', Now() + TOKEN_TTL, options);
            }
            if (refreshToken) {
                cookies.set('refreshToken', refreshToken, options);
            }
            this.setState({ isProfileRequestForMissingCookies: false });
        }
    };

    handleSessionStatus = () => {
        const { cookies } = this.props;
        const userId = cookies.get('userId') || null;
        if (userId) {
            localforage.getItem('lastActiveAt').then((value) => {
                if (value && value + MAX_IDLE_TIME > Now()) {
                    const ttl = cookies.get('tokenTTL') || null;
                    if (ttl && ttl < Now() + 120) {
                        this.handleRefreshToken();
                    }
                    // if MAX_IDLE_TIME did not elapse reset timeout from now
                    this.initialTimeout = setTimeout(this.handleSessionStatus, 60 * 1000);
                } else {
                    this.warningTimeout = setTimeout(
                        this.handleLogoutOnIdleNotification,
                        IDLE_TIME_LOGOUT * 1000,
                    );
                    this.setState({
                        // action: 'show_session_expire_warning',
                        notification: {
                            status: 'show_session_expire_warning',
                            title: trans[LANG].security,
                            message: trans[LANG].idleWarning,
                            errors: {},
                        },
                        isActiveSessionDialog: true,
                    });
                }
            });
        }
    };

    handleSessionWarning = (event) => {
        // close dialog
        this.setState({
            isActiveSessionDialog: false,
            notification: {
                status: '',
                title: '',
                message: '',
                errors: {},
            },
        });
        const buttonId = event.target.id;
        // if user clicks on extend then update last active on server
        if (buttonId === 'session_extend') {
            this.handleRefreshToken();
        } else {
            this.handleLogout();
        }
    };

    handleLogout = () => {
        this.setState({ isLogout: true });
        const { cookies, router } = this.props;
        const doLogout = (url) => {
            if (this.state.isLogout && url === '/') {
                router.events.off('routeChangeComplete', doLogout);
                cookies.remove('isAdmin', { path: '/' });
                cookies.remove('userId', { path: '/' });
                cookies.remove('roles', { path: '/' });
                cookies.remove('username', { path: '/' });
                cookies.remove('token', { path: '/' });
                cookies.remove('tokenTTL', { path: '/' });
                cookies.remove('refreshToken', { path: '/' });
                localforage.removeItem('userProfile');
                localforage.removeItem('loggedInAt');
                localforage.removeItem('lastActiveAt');
                localforage.removeItem('userProfile');
                this.props.actionLogout();
                axios.defaults.headers.common = { Authorization: null };
                this.setState({ isLogout: false });
            }
        };
        router.push('/');
        router.events.on('routeChangeComplete', doLogout);
    };

    handleLogoutOnIdleNotification = () => {
        // this will come from setTimeout and will only proceed if
        // notification is active, ie, user did not react to it
        if (this.state.isActiveSessionDialog) {
            this.setState({
                isActiveSessionDialog: false,
                notification: {
                    status: 'ok_and_dismiss',
                    title: trans[LANG].security,
                    message: trans[LANG].idleLogout,
                    errors: {},
                },
            });
            this.handleLogout();
        }
    };

    handleRefreshToken = () => {
        const refreshToken = this.props.cookies.get('refreshToken') || null;
        if (refreshToken) {
            this.props.actionRefreshToken(refreshToken);
            return true;
        }
        return false;
    };

    handleNotificationDismiss = () => {
        this.setState({
            notification: {
                status: '',
                title: '',
                message: '',
                errors: {},
            },
        });
    };

    render() {
        const { isActiveSessionDialog } = this.state;
        return (
            <>
                {isActiveSessionDialog ? (
                    <NotifierDialog
                        notification={this.state.notification}
                        handleSessionWarning={this.handleSessionWarning}
                    />
                ) : (
                    <NotifierDialog
                        notification={this.state.notification}
                        handleNotificationDismiss={this.handleNotificationDismiss}
                    />
                )}
            </>
        );
    }
}

SessionHandler.propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    router: PropTypes.object.isRequired,
    actionRefreshToken: PropTypes.func.isRequired,
    actionGetUserProfile: PropTypes.func.isRequired,
    isTokenExpired: PropTypes.bool.isRequired,
    isLogoutInit: PropTypes.bool.isRequired,
    actionLogout: PropTypes.func.isRequired,
    errorRefreshToken: PropTypes.any,
    roles: PropTypes.array,
    username: PropTypes.any,
    userId: PropTypes.any,
    token: PropTypes.string,
    refreshToken: PropTypes.string,
    userProfile: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        isTokenExpired: state.auth.isTokenExpired,
        isLogoutInit: state.auth.isLogoutInit,
        errorRefreshToken: state.auth.errorRefreshToken,
        roles: state.auth.roles,
        username: state.auth.username,
        userId: state.auth.userId,
        token: state.auth.token,
        refreshToken: state.auth.refreshToken,
        userProfile: state.auth.userProfile,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionLogout,
            actionRefreshToken,
            actionGetUserProfile,
        },
        dispatch,
    );
}

export default withCookies(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionHandler)),
);
