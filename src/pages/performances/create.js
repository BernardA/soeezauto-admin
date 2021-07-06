import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { required } from 'tools/validator';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPostPerformance, actionSetPostPerformanceToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';

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

const PerformanceCreate = (props) => {
    const {
        dataPostPerformance,
        errorPostPerformance,
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
    const [createdPerformance, setCreatedPerformance] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostPerformance) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: `Performance created ${dataPostPerformance.performance._id}`,
                errors: {},
            });
            reset();
            props.actionSetPostPerformanceToNull();
            setCreatedPerformance(dataPostPerformance.performance);
        }
        if (errorPostPerformance) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostPerformance,
            });
            props.actionSetPostPerformanceToNull();
        }
    }, [dataPostPerformance, errorPostPerformance, reset]);

    const handlePostPerformanceFormSubmit = () => {
        const formValues = props.performancePostForm.values;
        const values = {
            ...formValues,
            maxSpeed: parseInt(formValues.maxSpeed, 10),
            emissions: parseInt(formValues.emissions, 10),
        };
        props.actionPostPerformance(values);
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
            router.push(`/performances/view/${createdPerformance._id}`);
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
                        href: '/performances',
                        text: 'performances',
                    },
                    {
                        href: null,
                        text: 'performance create',
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
                    <form onSubmit={handleSubmit(handlePostPerformanceFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="to100"
                                type="text"
                                label="To100"
                                variant="outlined"
                                component={renderInput}
                                validate={[required]}
                                autoFocus
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="maxSpeed"
                                type="number"
                                label="Max speed"
                                variant="outlined"
                                component={renderInput}
                                validate={[required]}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="emissions"
                                type="number"
                                label="Emissions"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="mileageCity"
                                type="text"
                                label="Mileage city"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="mileageRoad"
                                type="text"
                                label="Mileage road"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="mileageMix"
                                type="text"
                                label="Mileage mix"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
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

PerformanceCreate.propTypes = {
    dataPostPerformance: PropTypes.any,
    errorPostPerformance: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostPerformance: state.performance.dataPostPerformance,
        errorPostPerformance: state.performance.errorPostPerformance,
        isLoading: state.performance.isLoading,
        performancePostForm: state.form.PerformancePostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostPerformance,
            actionSetPostPerformanceToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'PerformancePostForm',
    })(PerformanceCreate),
);
