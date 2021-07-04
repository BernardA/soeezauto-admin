import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import { Card, CardContent } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Loading from 'components/std/loading';
import LoginForm from 'components/loginForm';
import NotifierDialog from 'components/std/notifierDialog';
import { actionPostLogin, actionLogoutInit } from 'store/actions';
import styles from 'styles/login.module.scss';

const Login = (props) => {
    console.log('props', props);
    const { isLoading, errorPostLogin, roles, token } = props;
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(true);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        router.prefetch('/');
    }, []);

    useEffect(() => {
        if (token) {
            const isAdm =
                roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN');
            setIsAdmin(isAdm);
            console.log('isadm', isAdm);
            if (isAdm) {
                setNotification({
                    notification: {
                        status: 'redirect',
                        title: 'Success',
                        message: 'redirection',
                        errors: {},
                    },
                });
            } else {
                props.actionLogoutInit();
            }
        }
        if (errorPostLogin) {
            setNotification({
                notification: {
                    status: 'error',
                    title: 'Error',
                    message: 'See below',
                    errors: errorPostLogin,
                },
            });
        }
    }, [token, roles, errorPostLogin]);

    const onSubmitLogin = () => {
        props.actionPostLogin(props.loginForm.values);
    };

    const handleNotificationDismiss = () => {
        setNotification({
            notification: {
                status: '',
                title: '',
                message: '',
                errors: {},
            },
        });
    };

    return (
        <div className="container">
            <Head>
                <title>Login</title>
                <meta name="description" content="fazer login" />
                <meta name="robots" content="noindex follow" />
                <meta name="googlebot" content="noindex follow" />
            </Head>
            <main id="login_page">
                {isLoading ? <Loading /> : null}
                <div className="main-title">
                    <h1>Login</h1>
                </div>
                <Card bgcolor="secondary" id="noShadow" className={styles.root}>
                    <CardContent className={styles.content}>
                        {isAdmin && <LoginForm submitLogin={onSubmitLogin} />}
                    </CardContent>
                </Card>
                <NotifierDialog
                    notification={notification}
                    handleNotificationDismiss={handleNotificationDismiss}
                />
            </main>
        </div>
    );
};

Login.propTypes = {
    actionPostLogin: PropTypes.func.isRequired,
    actionLogoutInit: PropTypes.func.isRequired,
    loginForm: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
    roles: PropTypes.array,
    token: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        ...state.auth,
        loginForm: state.form.LoginForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostLogin,
            actionLogoutInit,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
