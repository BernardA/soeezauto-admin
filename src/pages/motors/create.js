import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { maxLength, minLength, required } from 'tools/validator';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPostMotor, actionSetPostMotorToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import getBrands from 'lib/getBrands';
import RenderSelect from 'components/formInputs/formInputRenderSelect';
import { FUELS, CYLINDERS, VALVES, ASPIRATIONS } from 'parameters';

const maxLength50 = maxLength(50);
const minLength5 = minLength(5);

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

const MotorCreate = (props) => {
    const {
        brands,
        dataPostMotor,
        errorPostMotor,
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
    const [createdMotor, setCreatedMotor] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostMotor) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: `Motor created ${dataPostMotor.motor._id}`,
                errors: {},
            });
            reset();
            props.actionSetPostMotorToNull();
            setCreatedMotor(dataPostMotor.motor);
        }
        if (errorPostMotor) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostMotor,
            });
            props.actionSetPostMotorToNull();
        }
    }, [dataPostMotor, errorPostMotor, reset]);

    const handlePostMotorFormSubmit = () => {
        const formValues = props.motorPostForm.values;
        const values = {
            ...formValues,
            cylinder: formValues.cylinder ? parseInt(formValues.cylinder, 10) : undefined,
            cc: formValues.cc ? parseInt(formValues.cc, 10) : undefined,
            power: parseInt(formValues.power, 10),
            valves: formValues.valves ? parseInt(formValues.valves, 10) : undefined,
        };
        props.actionPostMotor(values);
    };

    const handleSetBrandSelect = () => {
        const options = [<MenuItem key={0} aria-label="None" value="" />];
        brands.forEach((brand) => {
            options.push(
                <MenuItem value={brand.id} key={brand.id}>
                    {brand.brand}
                </MenuItem>,
            );
        });

        return options;
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
            router.push(`/motors/view/${createdMotor._id}`);
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
                        href: '/motors',
                        text: 'motors',
                    },
                    {
                        href: null,
                        text: 'motor create',
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
                    <form onSubmit={handleSubmit(handlePostMotorFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="name"
                                type="text"
                                label="name"
                                variant="outlined"
                                component={renderInput}
                                validate={[required, minLength5, maxLength50]}
                                autoFocus
                            />
                        </div>
                        <div className="form_input form_select">
                            <Field name="brand" label="brand" component={RenderSelect}>
                                {handleSetBrandSelect()}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="fuel"
                                label="Fuel"
                                component={RenderSelect}
                                validate={[required]}
                            >
                                <MenuItem key={0} aria-label="None" value="">
                                    Select
                                </MenuItem>
                                {FUELS.map((fuel) => (
                                    <MenuItem value={fuel} key={fuel}>
                                        {fuel}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="cylinder"
                                label="Cylinder"
                                component={RenderSelect}
                            >
                                <MenuItem key={0} aria-label="None" value="">
                                    Select
                                </MenuItem>
                                {CYLINDERS.map((cylinder) => (
                                    <MenuItem value={cylinder} key={cylinder}>
                                        {cylinder}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input">
                            <Field
                                name="cc"
                                type="number"
                                label="CC"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="power"
                                type="number"
                                label="Power"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="torque"
                                type="text"
                                label="Torque"
                                variant="outlined"
                                component={renderInput}
                                validate={[required]}
                            />
                        </div>
                        <div className="form_input form_select">
                            <Field name="valves" label="Valves" component={RenderSelect}>
                                <MenuItem key={0} aria-label="None" value="">
                                    Select
                                </MenuItem>
                                {VALVES.map((valve) => (
                                    <MenuItem value={valve} key={valve}>
                                        {valve}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="aspiration"
                                label="Aspiration"
                                component={RenderSelect}
                            >
                                <MenuItem key={0} aria-label="None" value="">
                                    Select
                                </MenuItem>
                                {ASPIRATIONS.map((aspiration) => (
                                    <MenuItem value={aspiration} key={aspiration}>
                                        {aspiration}
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

MotorCreate.propTypes = {
    dataPostMotor: PropTypes.any,
    errorPostMotor: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostMotor: state.motor.dataPostMotor,
        errorPostMotor: state.motor.errorPostMotor,
        isLoading: state.motor.isLoading,
        motorPostForm: state.form.MotorPostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostMotor,
            actionSetPostMotorToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'MotorPostForm',
    })(MotorCreate),
);

export async function getServerSideProps() {
    const brands = await getBrands();
    return {
        props: {
            brands: brands.data.brands,
        },
    };
}
