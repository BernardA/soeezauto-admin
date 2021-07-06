import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPutPerformance, actionSetPutPerformanceToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import { apiQl } from 'lib/functions';

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

const PerformanceEdit = (props) => {
    const {
        performance,
        dataPutPerformance,
        errorPutPerformance,
        isLoading,
        handleSubmit,
        submitting,
        invalid,
        error,
        pristine,
        reset,
        change,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        change('to100', performance.to100);
        change('maxSpeed', performance.maxSpeed);
        change('emissions', performance.emissions);
        performance.mileageCity && change('mileageCity', performance.mileageCity);
        performance.mileageRoad && change('mileageRoad', performance.mileageRoad);
        change('mileageMix', performance.mileageMix);
    }, [performance]);

    useEffect(() => {
        if (dataPutPerformance) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Performance edited',
                errors: {},
            });
            reset();
            props.actionSetPutPerformanceToNull();
        }
        if (errorPutPerformance) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutPerformance,
            });
            props.actionSetPutPerformanceToNull();
        }
    }, [dataPutPerformance, errorPutPerformance, reset]);

    const handlePutPerformanceFormSubmit = () => {
        const formValues = props.performancePutForm.values;
        const values = {
            ...formValues,
            id: performance.id,
            maxSpeed: formValues.maxSpeed ? parseInt(formValues.maxSpeed, 10) : undefined,
            emissions: formValues.emissions
                ? parseInt(formValues.emissions, 10)
                : undefined,
        };
        props.actionPutPerformance(values);
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
            router.push(`/performances/view/${performance._id}`);
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
                        text: 'performance edit',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p />
                    <Link href={`/performances/view/${router.query.performanceId}`}>
                        <Button color="inherit">View</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form onSubmit={handleSubmit(handlePutPerformanceFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="to100"
                                type="text"
                                label="To100"
                                variant="outlined"
                                component={renderInput}
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
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="emissions"
                                type="number"
                                label="Emissions"
                                variant="outlined"
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

PerformanceEdit.propTypes = {
    performance: PropTypes.object.isRequired,
    dataPutPerformance: PropTypes.any,
    errorPutPerformance: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutPerformance: state.performance.dataPutPerformance,
        errorPutPerformance: state.performance.errorPutPerformance,
        isLoading: state.performance.isLoading,
        performancePutForm: state.form.PerformancePutForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutPerformance,
            actionSetPutPerformanceToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'PerformancePutForm',
    })(PerformanceEdit),
);

const queryQl = `query getPerformance(
    $id: ID!
){
    performance(id: $id){
        _id
        id
        to100
        maxSpeed
        emissions
        mileageCity
        mileageRoad
        mileageMix
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/performances/${context.params.performanceId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            performance: data.data.performance,
        },
    };
}
