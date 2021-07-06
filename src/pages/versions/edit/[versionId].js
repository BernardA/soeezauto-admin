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
import { renderInput, renderSwitch } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPutVersion, actionSetPutVersionToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import getTyres from 'lib/getTyres';
import getTaxes from 'lib/getTaxes';
import { apiQl } from 'lib/functions';
import RenderSelect from 'components/formInputs/formInputRenderSelect';
import { BODY_TYPES, GEARBOXES, DOORS, PLACES, TRACTIONS } from 'parameters';

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

const VersionEdit = (props) => {
    const {
        version,
        tyres,
        taxes,
        dataPutVersion,
        errorPutVersion,
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
    const [isActive, setIsActive] = useState(false);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (version) {
            setIsActive(version.isActive);
            change('version', version.version);
            change('isActive', version.isActive);
            change('motor', version.motor.id);
            change('measures', version.measures.id);
            change('performance', version.performance.id);
            change('bodyType', version.bodyType);
            change('gearbox', version.gearbox);
            change('places', version.places);
            change('doors', version.doors);
            change('traction', version.traction);
            change('gvw', version.gvw);
            version.curbWeight && change('curbWeight', version.curbWeight);
            change('tyreFront', version.tyreFront.id);
            version.tyreBack && change('tyreBack', version.tyreBack.id);
            change('CF', version.CF.id);
        }
    }, [version]);

    useEffect(() => {
        if (dataPutVersion) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Version edited',
                errors: {},
            });
            reset();
            props.actionSetPutVersionToNull();
        }
        if (errorPutVersion) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutVersion,
            });
            props.actionSetPutVersionToNull();
        }
    }, [dataPutVersion, errorPutVersion, reset]);

    const handleIsActiveChange = (event) => {
        setIsActive(event.target.checked);
    };

    const handlePutVersionFormSubmit = () => {
        const formValues = props.versionPutForm.values;
        const values = {
            ...formValues,
            gvw: formValues.gvw ? parseInt(formValues.gvw, 10) : undefined,
            curbWeight: formValues.curbWeight
                ? parseInt(formValues.curbWeight, 10)
                : undefined,
            id: version.id,
        };
        props.actionPutVersion(values);
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
            router.push(`/versions/view/${version._id}`);
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
                        href: '/versions',
                        text: 'versions',
                    },
                    {
                        href: null,
                        text: 'version edit',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p>{`${version.version}`}</p>
                    <Link href={`/versions/view/${router.query.versionId}`}>
                        <Button color="inherit">View</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form onSubmit={handleSubmit(handlePutVersionFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="version"
                                type="text"
                                label="Version"
                                variant="outlined"
                                component={renderInput}
                                validate={[minLength5, maxLength50]}
                                placeholder={version.version}
                                autoFocus
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="isActive"
                                label="active"
                                checked={isActive}
                                onChange={handleIsActiveChange}
                                component={renderSwitch}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="motor"
                                type="text"
                                label="Engine"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="measures"
                                type="text"
                                label="Measures"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="performance"
                                type="text"
                                label="Performance"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="bodyType"
                                label="Body type"
                                component={RenderSelect}
                            >
                                <MenuItem key={0} aria-label="None" value="">
                                    Select
                                </MenuItem>
                                {BODY_TYPES.map((body) => (
                                    <MenuItem value={body} key={body}>
                                        {body}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="gearbox"
                                label="Gearbox"
                                component={RenderSelect}
                            >
                                <MenuItem key={0} aria-label="None" value="" />
                                {GEARBOXES.map((gearbox) => (
                                    <MenuItem value={gearbox} key={gearbox}>
                                        {gearbox}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field name="places" label="Places" component={RenderSelect}>
                                <MenuItem key={0} aria-label="None" value="" />
                                {PLACES.map((place) => (
                                    <MenuItem value={place} key={place}>
                                        {place}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field name="doors" label="Doors" component={RenderSelect}>
                                <MenuItem key={0} aria-label="None" value="" />
                                {DOORS.map((door) => (
                                    <MenuItem value={door} key={door}>
                                        {door}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="traction"
                                label="Traction"
                                component={RenderSelect}
                            >
                                <MenuItem key={0} aria-label="None" value="" />
                                {TRACTIONS.map((traction) => (
                                    <MenuItem value={traction} key={traction}>
                                        {traction}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input">
                            <Field
                                name="gvw"
                                type="number"
                                label="GVW"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="curbWeight"
                                type="number"
                                label="Curb weight"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="tyreFront"
                                label="Tyre front"
                                component={RenderSelect}
                            >
                                <MenuItem key={0} aria-label="None" value="" />
                                {tyres.map((tyre) => (
                                    <MenuItem value={tyre.id} key={tyre.id}>
                                        {tyre.tyre}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="tyreBack"
                                label="Tyre back"
                                component={RenderSelect}
                            >
                                <MenuItem key={0} aria-label="None" value="" />
                                {tyres.map((tyre) => (
                                    <MenuItem value={tyre.id} key={tyre.id}>
                                        {tyre.tyre}
                                    </MenuItem>
                                ))}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input form_select">
                            <Field name="CF" label="CF" component={RenderSelect}>
                                <MenuItem key={0} aria-label="None" value="" />
                                {taxes.map((tax) => (
                                    <MenuItem value={tax.id} key={tax.id}>
                                        {tax.CF}
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

VersionEdit.propTypes = {
    version: PropTypes.object.isRequired,
    dataPutVersion: PropTypes.any,
    errorPutVersion: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutVersion: state.version.dataPutVersion,
        errorPutVersion: state.version.errorPutVersion,
        isLoading: state.version.isLoading,
        versionPutForm: state.form.VersionPutForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutVersion,
            actionSetPutVersionToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'VersionPutForm',
    })(VersionEdit),
);

const queryQl = `query getVersion(
  	    $id: ID!
    ){
    version(id: $id){
        id
        _id
        version
        isActive
        model {
            id
            model
        }
        bodyType
        gearbox
        places
        doors
        curbWeight
        gvw
        traction
        tyreFront {
            id
            tyre
        }
        tyreBack {
            id
            tyre
        }
        prices(
            _order: {updatedAt: "DESC"}
        ) {
            edges {
                node {
                    id
                    updatedAt
                    price
                    promo
                    isActive
                }
            }
        }
        CF {
            id
            CF
        }
        motor {
            id
            power
            fuel
            cc
            cylinder
            torque
            valves
            aspiration
        }
        measures {
            id
            fuelTank
            width
            height
            length
            wheelbase
            trunk
            trunkMax
        }
        performance {
            id
            to100
            maxSpeed
            emissions
            mileageCity
            mileageRoad
            mileageMix
        }
        trims(_order: { trim: "ASC"}) {
            id
            trim
            trimType
        }
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/versions/${context.params.versionId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    const tyres = await getTyres();
    const taxes = await getTaxes();
    return {
        props: {
            version: data.data.version,
            tyres: tyres.data.tyres,
            taxes: taxes.data.taxes,
        },
    };
}
