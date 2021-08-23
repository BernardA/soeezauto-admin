import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
} from '@material-ui/core/';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    paperFullWidth: {
        margin: 0,
        width: '100%',
    },
    title: {
        backgroundColor: '#de1b',
        padding: '0 24px',
    },
    h6: {
        lineHeight: '40px',
    },
    content: {
        borderBottom: '1px solid #ccc',
        minHeight: '50px',
        '& div': {
            marginTop: '20px',
        },
    },
    buttonLeft: {
        marginLeft: '10px',
    },
    actions: {
        minHeight: '50px',
        '& h4': {
            width: '100%',
            textAlign: 'center',
        },
    },
}));

const DialogTitle = (props) => {
    const { children } = props;
    const classes = useStyles();
    return (
        <MuiDialogTitle disableTypography className={classes.title}>
            <Typography variant="h6" className={classes.h6}>
                {children}
            </Typography>
        </MuiDialogTitle>
    );
};

const NotifierDialog = (props) => {
    const { notification, handleNotificationDismiss, handleSessionWarning } = props;
    const classes = useStyles();

    const [open] = useState(true);

    const showErrors = () => {
        const errors = notification.errors;
        console.log('errors', errors);
        if (errors && errors.length > 0) {
            const output = errors.map((error) => {
                const key = Object.keys(error)[0];
                return <li key={`${key} - ${error[key]}`}>{`${key} - ${error[key]}`}</li>;
            });
            return <ul>{output}</ul>;
        }
        return null;
    };

    const actions = () => {
        switch (notification.status) {
            case 'ok_and_dismiss':
                return (
                    <Button
                        id="dismiss_notification"
                        onClick={handleNotificationDismiss}
                        color="primary"
                        autoFocus
                    >
                        Fermer
                    </Button>
                );
            case 'error':
                return (
                    <Button
                        id="dismiss_notification"
                        onClick={handleNotificationDismiss}
                        color="primary"
                        autoFocus
                    >
                        Fermer
                    </Button>
                );
            case 'show_session_expire_warning':
                return (
                    <>
                        <Button
                            id="session_expire"
                            onClick={handleSessionWarning}
                            color="primary"
                        >
                            Terminer session
                        </Button>
                        <Button
                            id="session_extend"
                            className={classes.buttonLeft}
                            onClick={handleSessionWarning}
                            color="primary"
                            autoFocus
                        >
                            Continuer session
                        </Button>
                    </>
                );
            case 'show_logout_idle_message':
                return (
                    <Button
                        id="session_logout"
                        onClick={handleSessionWarning}
                        color="primary"
                        autoFocus
                    >
                        Fermer
                    </Button>
                );
            case 'confirm':
                return (
                    <>
                        <Button
                            id="cancelled"
                            className={classes.buttonLeft}
                            variant="outlined"
                            color="primary"
                            onClick={handleNotificationDismiss}
                        >
                            Annuler
                        </Button>
                        <Button
                            id="confirmed"
                            variant="outlined"
                            color="primary"
                            onClick={handleNotificationDismiss}
                        >
                            Confirmer
                        </Button>
                    </>
                );
            case 'redirect':
                return (
                    <Button
                        id="dismiss_notification"
                        onClick={handleNotificationDismiss}
                        color="primary"
                        autoFocus
                    >
                        Fermer
                    </Button>
                );
            default:
                return null;
        }
    };

    if (notification.status !== '') {
        return (
            <Dialog className={classes.paperFullWidth} open={open} fullWidth>
                <DialogTitle>{notification.title}</DialogTitle>
                <DialogContent className={classes.content}>
                    <div>{notification.message}</div>
                    {showErrors()}
                </DialogContent>
                <DialogActions className={classes.actions}>{actions()}</DialogActions>
            </Dialog>
        );
    }
    return null;
};

NotifierDialog.propTypes = {
    notification: PropTypes.object.isRequired,
    handleNotificationDismiss: PropTypes.func,
    handleSessionWarning: PropTypes.func,
};

export default React.memo(NotifierDialog);
