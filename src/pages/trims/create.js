import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { required } from 'tools/validator';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPostTrim, actionSetPostTrimToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import { TRIM_TYPES } from 'parameters';
import RenderSelect from 'components/formInputs/formInputRenderSelect';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    barRoot: {
        backgroundColor: 'initial',
        color: 'initial',
        '& .MuiToolbar-root': {
            justifyContent: 'space-between',
        },
    },
    cardContent: {
        width: 300,
        margin: '0 auto',
        '& div': {
            marginBottom: 5,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const TrimCreate = (props) => {
    const {
        dataPostTrim,
        errorPostTrim,
        isLoading,
        handleSubmit,
        submitting,
        invalid,
        error,
        pristine,
        reset,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [createdTrim, setCreatedTrim] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostTrim) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: `Trim created ${dataPostTrim.trim._id}`,
                errors: {},
            });
            reset();
            props.actionSetPostTrimToNull();
            setCreatedTrim(dataPostTrim.trim);
        }
        if (errorPostTrim) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostTrim,
            });
            props.actionSetPostTrimToNull();
        }
    }, [dataPostTrim, errorPostTrim, reset]);

    const handlePostTrimFormSubmit = () => {
        const formValues = props.trimPostForm.values;
        props.actionPostTrim(formValues);
    };

    const handleNotificationDismiss = () => {
        const title = notification.title;
        setNotification({
            status: '',
            title: '',
            message: '',
            errors: {},
        });
        if (title === 'Success') {
            router.push(`/trims/view/${createdTrim._id}`);
        }
    };
    if (error) {
        return <div>{error.messageKey}</div>;
    }
    return (
        <div>
            {isLoading ? <Loading /> : null}
            <Breadcrumb
                links={[
                    {
                        href: '/trims',
                        text: 'trims',
                    },
                    {
                        href: null,
                        text: 'trim create',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p />
                    <p />
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form onSubmit={handleSubmit(handlePostTrimFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="trim"
                                type="text"
                                label="Trim"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="trimType"
                                label="Trim type"
                                component={RenderSelect}
                                validate={[required]}
                            >
                                <MenuItem key={0} aria-label="None" value="">
                                    Select
                                </MenuItem>
                                {TRIM_TYPES.map((type) => (
                                    <MenuItem value={type} key={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <FormSubmit
                            pristine={pristine}
                            submitting={submitting}
                            reset={reset}
                            invalid={invalid}
                        />
                    </form>
                </CardContent>
            </Card>
            <NotifierDialog
                notification={notification}
                handleNotificationDismiss={handleNotificationDismiss}
            />
        </div>
    );
};

TrimCreate.propTypes = {
    dataPostTrim: PropTypes.any,
    errorPostTrim: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostTrim: state.trim.dataPostTrim,
        errorPostTrim: state.trim.errorPostTrim,
        isLoading: state.trim.isLoading,
        trimPostForm: state.form.TrimPostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostTrim,
            actionSetPostTrimToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'TrimPostForm',
    })(TrimCreate),
);
