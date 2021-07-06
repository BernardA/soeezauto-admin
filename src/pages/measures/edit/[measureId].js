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
import { actionPutMeasure, actionSetPutMeasureToNull } from 'store/actions';
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
            marginBottom: 15,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const MeasureEdit = (props) => {
    const {
        measure,
        dataPutMeasure,
        errorPutMeasure,
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
        measure.fuelTank && change('fuelTank', measure.fuelTank);
        change('width', measure.width);
        change('height', measure.height);
        change('length', measure.length);
        change('wheelbase', measure.wheelbase);
        change('trunk', measure.trunk);
        measure.trunkMax && change('trunkMax', measure.trunkMax);
    }, [measure]);

    useEffect(() => {
        if (dataPutMeasure) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Measure edited',
                errors: {},
            });
            reset();
            props.actionSetPutMeasureToNull();
        }
        if (errorPutMeasure) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutMeasure,
            });
            props.actionSetPutMeasureToNull();
        }
    }, [dataPutMeasure, errorPutMeasure, reset]);

    const handlePutMeasureFormSubmit = () => {
        const formValues = props.measurePutForm.values;
        const values = {
            ...formValues,
            id: measure.id,
            fuelTank: formValues.fuelTank ? parseInt(formValues.fuelTank, 10) : undefined,
            width: formValues.width ? parseInt(formValues.width, 10) : undefined,
            height: formValues.height ? parseInt(formValues.height, 10) : undefined,
            length: formValues.length ? parseInt(formValues.height, 10) : undefined,
            wheelbase: formValues.wheelbase
                ? parseInt(formValues.wheelbase, 10)
                : undefined,
            trunk: formValues.trunk ? parseInt(formValues.trunk, 10) : undefined,
            trunkMax: formValues.trunkMax ? parseInt(formValues.trunkMax, 10) : undefined,
        };
        props.actionPutMeasure(values);
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
            router.push(`/measures/view/${measure._id}`);
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
                        text: 'measure edit',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p />
                    <Link href={`/measures/view/${router.query.measureId}`}>
                        <Button color="inherit">View</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form onSubmit={handleSubmit(handlePutMeasureFormSubmit)}>
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
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="height"
                                type="number"
                                label="Height"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="length"
                                type="number"
                                label="Length"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="wheelbase"
                                type="number"
                                label="Wheelbase"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="trunk"
                                type="number"
                                label="Trunk"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="trunkMax"
                                type="number"
                                label="Trunk max"
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

MeasureEdit.propTypes = {
    measure: PropTypes.object.isRequired,
    dataPutMeasure: PropTypes.any,
    errorPutMeasure: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutMeasure: state.measure.dataPutMeasure,
        errorPutMeasure: state.measure.errorPutMeasure,
        isLoading: state.measure.isLoading,
        measurePutForm: state.form.MeasurePutForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutMeasure,
            actionSetPutMeasureToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'MeasurePutForm',
    })(MeasureEdit),
);

const queryQl = `query getMeasure(
    $id: ID!
){
    measure(id: $id){
        _id
        id
        fuelTank
		width
      	height
      	length
      	wheelbase
      	trunk
      	trunkMax
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/measures/${context.params.measureId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            measure: data.data.measure,
        },
    };
}
