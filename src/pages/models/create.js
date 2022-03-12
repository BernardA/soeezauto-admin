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
import { renderInput, renderSwitch } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPostModel, actionSetPostModelToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import getBrands from 'lib/getBrands';
import getSegments from 'lib/getSegments';
import RenderSelect from 'components/formInputs/formInputRenderSelect';

const maxLength50 = maxLength(50);
const minLength2 = minLength(2);

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
        '& div': {
            marginBottom: 15,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const ModelCreate = (props) => {
    const {
        brands,
        segments,
        dataPostModel,
        errorPostModel,
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
    const [isActive, setIsActive] = useState(true);
    const [createdModel, setCreatedModel] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        // set default input values
        change('isActive', true);
        change('modelYear', new Date().getFullYear());
    }, []);

    useEffect(() => {
        if (dataPostModel) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Model created',
                errors: {},
            });
            reset();
            props.actionSetPostModelToNull();
            setCreatedModel(dataPostModel.model);
        }
        if (errorPostModel) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostModel,
            });
            props.actionSetPostModelToNull();
        }
    }, [dataPostModel, errorPostModel, reset]);

    const handleIsActiveChange = (event) => {
        setIsActive(event.target.checked);
    };

    const handlePostModelFormSubmit = () => {
        const values = {
            ...props.modelPostForm.values,
            modelYear: parseInt(props.modelPostForm.values.modelYear, 10),
        };
        props.actionPostModel(values);
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

    const handleSetSegmentSelect = () => {
        const options = [<MenuItem key={0} aria-label="None" value="" />];
        segments.forEach((segment) => {
            options.push(
                <MenuItem value={segment.id} key={segment.id}>
                    {segment.segment}
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
            router.push(`/models/view/${createdModel._id}`);
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
                        href: '/models',
                        text: 'models',
                    },
                    {
                        href: null,
                        text: 'model create',
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
                    <form onSubmit={handleSubmit(handlePostModelFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="model"
                                type="text"
                                label="model"
                                variant="outlined"
                                component={renderInput}
                                validate={[required, minLength2, maxLength50]}
                                autoFocus
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="modelYear"
                                type="number"
                                label="modelYear"
                                variant="outlined"
                                component={renderInput}
                                validate={[required]}
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
                                name="segment"
                                label="segment"
                                component={RenderSelect}
                                validate={[required]}
                            >
                                {handleSetSegmentSelect()}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </div>
                        <div className="form_input">
                            <Field
                                name="isActive"
                                label="active"
                                checked={isActive}
                                onChange={handleIsActiveChange}
                                component={renderSwitch}
                                validate={required}
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

ModelCreate.propTypes = {
    dataPostModel: PropTypes.any,
    errorPostModel: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostModel: state.model.dataPostModel,
        errorPostModel: state.model.errorPostModel,
        isLoading: state.model.isLoading,
        modelPostForm: state.form.ModelPostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostModel,
            actionSetPostModelToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'ModelPostForm',
    })(ModelCreate),
);

export async function getServerSideProps() {
    const brands = await getBrands();
    const segments = await getSegments();
    return {
        props: {
            brands: brands.data.brands,
            segments: segments.data.segments,
        },
    };
}
