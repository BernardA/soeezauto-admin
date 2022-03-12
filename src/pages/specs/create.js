import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Card, CardContent, AppBar, Toolbar, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import getBrandsModels from 'lib/getBrandsModels';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import RenderSelect from 'components/formInputs/formInputRenderSelect';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPostSpec, actionSetPostSpecToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import { maxLength, minLength, required } from 'tools/validator';

const maxLength2 = maxLength(2);
const minLength2 = minLength(2);
const maxLength4 = maxLength(4);
const minLength4 = minLength(4);

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

const SpecCreate = (props) => {
    const {
        brands,
        dataPostSpec,
        errorPostSpec,
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
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        const now = new Date();
        change('year', `${now.getFullYear()}`);
        change(
            'month',
            now.getMonth() + 1 > 10 ? `${now.getMonth() + 1}` : `0${now.getMonth() + 1}`,
        );
    }, []);

    useEffect(() => {
        if (!dataPostSpec) {
            const now = new Date();
            change('year', `${now.getFullYear()}`);
            change(
                'month',
                now.getMonth() + 1 > 9
                    ? `${now.getMonth() + 1}`
                    : `0${now.getMonth() + 1}`,
            );
        }
    }, [dataPostSpec]);

    useEffect(() => {
        if (dataPostSpec) {
            let message = `Specs created: ${dataPostSpec.countCreatedSpecs}`;
            if (dataPostSpec.countFiles !== dataPostSpec.countCreatedSpecs) {
                message = `Specs created: ${dataPostSpec.countCreatedSpecs} not equal to
                existing files: ${dataPostSpec.countFiles}`;
            }
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message,
                errors: {},
            });
            reset();
            props.actionSetPostSpecToNull();
        }
        if (errorPostSpec) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostSpec,
            });
            props.actionSetPostSpecToNull();
        }
    }, [dataPostSpec, errorPostSpec, reset]);

    const handlePostSpecFormSubmit = () => {
        props.actionPostSpec(props.specPostForm.values);
    };

    const handleSetBrandSelect = () => {
        const options = [];
        brands.forEach((bra) => {
            options.push(
                <MenuItem value={bra._id} key={bra.id}>
                    {bra.brand}
                </MenuItem>,
            );
        });

        return options;
    };

    const handleNotificationDismiss = () => {
        setNotification({
            status: '',
            title: '',
            message: '',
            errors: {},
        });
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
                        href: '/specificatons',
                        text: 'specifications',
                    },
                    {
                        href: null,
                        text: 'specifications create',
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
                    <form onSubmit={handleSubmit(handlePostSpecFormSubmit)}>
                        <Field
                            name="brandId"
                            label="Brand"
                            component={RenderSelect}
                            validate={[required]}
                        >
                            <MenuItem key={0} aria-label="Choisir" value="Choisir">
                                Choisir
                            </MenuItem>
                            {handleSetBrandSelect()}
                        </Field>
                        <div className="form_input">
                            <Field
                                name="year"
                                type="number"
                                label="Year"
                                variant="outlined"
                                component={renderInput}
                                validate={[required, minLength4, maxLength4]}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="month"
                                type="number"
                                label="Month"
                                variant="outlined"
                                component={renderInput}
                                validate={[required, minLength2, maxLength2]}
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

SpecCreate.propTypes = {
    dataPostSpec: PropTypes.any,
    errorPostSpec: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostSpec: state.specifications.dataPostSpec,
        errorPostSpec: state.specifications.errorPostSpec,
        isLoading: state.specifications.isLoading,
        specPostForm: state.form.SpecPostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostSpec,
            actionSetPostSpecToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'SpecPostForm',
    })(SpecCreate),
);

export async function getServerSideProps() {
    const brands = await getBrandsModels();
    return {
        props: {
            brands: brands.data.brands,
        },
    };
}
