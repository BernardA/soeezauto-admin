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
import { actionPostMeasure, actionSetPostMeasureToNull } from 'store/actions';
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

const MeasureCreate = (props) => {
    const {
        dataPostMeasure,
        errorPostMeasure,
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
    const [createdMeasure, setCreatedMeasure] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostMeasure) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: `Measure created ${dataPostMeasure.measure._id}`,
                errors: {},
            });
            reset();
            props.actionSetPostMeasureToNull();
            setCreatedMeasure(dataPostMeasure.measure);
        }
        if (errorPostMeasure) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostMeasure,
            });
            props.actionSetPostMeasureToNull();
        }
    }, [dataPostMeasure, errorPostMeasure, reset]);

    const handlePostMeasureFormSubmit = () => {
        const formValues = props.measurePostForm.values;
        const values = {
            ...formValues,
            fuelTank: formValues.fuelTank ? parseInt(formValues.fuelTank, 10) : undefined,
            width: parseInt(formValues.width, 10),
            height: parseInt(formValues.height, 10),
            length: parseInt(formValues.length, 10),
            wheelbase: parseInt(formValues.wheelbase, 10),
            trunk: parseInt(formValues.trunk, 10),
            trunkMax: formValues.trunkMax ? parseInt(formValues.trunkMax, 10) : undefined,
        };
        props.actionPostMeasure(values);
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
            router.push(`/measures/view/${createdMeasure._id}`);
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
                        href: '/measures',
                        text: 'measures',
                    },
                    {
                        href: null,
                        text: 'measure create',
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
                    <form onSubmit={handleSubmit(handlePostMeasureFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="fuelTank"
                                type="number"
                                label="Fuel tank"
                                variant="outlined"
                                component={renderInput}
                                autoFocus
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="width"
                                type="number"
                                label="Width"
                                variant="outlined"
                                component={renderInput}
                                validate={[required]}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="height"
                                type="number"
                                label="Height"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="length"
                                type="number"
                                label="Length"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="wheelbase"
                                type="number"
                                label="Wheelbase"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="trunk"
                                type="number"
                                label="Trunk"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="trunkMax"
                                type="number"
                                label="Trunk max"
                                variant="outlined"
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

MeasureCreate.propTypes = {
    dataPostMeasure: PropTypes.any,
    errorPostMeasure: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostMeasure: state.measure.dataPostMeasure,
        errorPostMeasure: state.measure.errorPostMeasure,
        isLoading: state.measure.isLoading,
        measurePostForm: state.form.MeasurePostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostMeasure,
            actionSetPostMeasureToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'MeasurePostForm',
    })(MeasureCreate),
);
