import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar, Button, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { maxLength, minLength } from 'tools/validator';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPutMotor, actionSetPutMotorToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import getBrands from 'lib/getBrands';
import { apiQl } from 'lib/functions';
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
            marginBottom: 15,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const MotorEdit = (props) => {
    const {
        motor,
        brands,
        dataPutMotor,
        errorPutMotor,
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
        change('name', motor.name);
        change('brand', motor.brand.id);
        change('fuel', motor.fuel);
        motor.cylinder && change('cylinder', motor.cylinder);
        motor.cc && change('cc', motor.cc);
        change('power', motor.power);
        change('torque', motor.torque);
        motor.valves && change('valves', motor.valves);
        motor.aspiration && change('aspiration', motor.aspiration);
    }, [motor]);
    useEffect(() => {
        if (dataPutMotor) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Motor edited',
                errors: {},
            });
            reset();
            props.actionSetPutMotorToNull();
        }
        if (errorPutMotor) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutMotor,
            });
            props.actionSetPutMotorToNull();
        }
    }, [dataPutMotor, errorPutMotor, reset]);

    const handlePutMotorFormSubmit = () => {
        const formValues = props.motorPutForm.values;
        const values = {
            ...formValues,
            id: motor.id,
            cylinder: formValues.cylinder ? parseInt(formValues.cylinder, 10) : undefined,
            cc: formValues.cc ? parseInt(formValues.cc, 10) : undefined,
            power: formValues.power ? parseInt(formValues.power, 10) : undefined,
            valves: formValues.valves ? parseInt(formValues.valves, 10) : undefined,
        };
        props.actionPutMotor(values);
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
            router.push(`/motors/view/${motor._id}`);
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
                        text: 'motor edit',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p>{`${motor.name} ${motor.brand.brand}`}</p>
                    <Link href={`/motors/view/${router.query.motorId}`}>
                        <Button color="inherit">View</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form onSubmit={handleSubmit(handlePutMotorFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="name"
                                type="text"
                                label="name"
                                variant="outlined"
                                component={renderInput}
                                validate={[minLength5, maxLength50]}
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
                            <Field name="fuel" label="Fuel" component={RenderSelect}>
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

MotorEdit.propTypes = {
    motor: PropTypes.object.isRequired,
    dataPutMotor: PropTypes.any,
    errorPutMotor: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutMotor: state.motor.dataPutMotor,
        errorPutMotor: state.motor.errorPutMotor,
        isLoading: state.motor.isLoading,
        motorPutForm: state.form.MotorPutForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutMotor,
            actionSetPutMotorToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'MotorPutForm',
    })(MotorEdit),
);

const queryQl = `query getMotor(
    $id: ID!
){
    motor(id: $id){
        _id
        id
        brand{
            id
            brand
        }
        name
        fuel
        cylinder
        cc
        power
        torque
        valves
        aspiration
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/motors/${context.params.motorId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    const brands = await getBrands();
    return {
        props: {
            motor: data.data.motor,
            brands: brands.data.brands,
        },
    };
}
