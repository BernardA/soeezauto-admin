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
import { actionPutModel, actionSetPutModelToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import getBrands from 'lib/getBrands';
import getSegments from 'lib/getSegments';
import { apiQl } from 'lib/functions';
import RenderSelect from 'components/formInputs/formInputRenderSelect';

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
        '& div': {
            marginBottom: 15,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const ModelEdit = (props) => {
    const {
        model,
        brands,
        segments,
        dataPutModel,
        errorPutModel,
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
        if (model) {
            setIsActive(model.isActive);
            change('isActive', model.isActive);
            change('model', model.model);
            change('modelYear', model.modelYear);
            change('brand', model.brand.id);
            change('segment', model.segment.id);
        }
    }, [model]);

    useEffect(() => {
        if (dataPutModel) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Model edited',
                errors: {},
            });
            reset();
            props.actionSetPutModelToNull();
        }
        if (errorPutModel) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutModel,
            });
            props.actionSetPutModelToNull();
        }
    }, [dataPutModel, errorPutModel, reset]);

    const handleIsActiveChange = (event) => {
        setIsActive(event.target.checked);
    };

    const handlePutModelFormSubmit = () => {
        const values = {
            ...props.modelPutForm.values,
            id: model.id,
            model: props.modelPutForm.values.model || model.model,
            modelYear: props.modelPutForm.values.modelYear || model.modelYear,
            brandId: props.modelPutForm.values.brandId || model.brand.id,
            segmentId: props.modelPutForm.values.segmentId || model.segment.id,
        };
        props.actionPutModel(values);
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
            router.push(`/models/view/${model._id}`);
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
                        text: 'model edit',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p>{`${model.model} ${model.brand.brand}`}</p>
                    <Link href={`/models/view/${router.query.modelId}`}>
                        <Button color="inherit">View</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form
                        name="contact"
                        onSubmit={handleSubmit(handlePutModelFormSubmit)}
                    >
                        <div className="form_input">
                            <Field
                                name="model"
                                type="text"
                                label="model"
                                variant="outlined"
                                component={renderInput}
                                validate={[minLength5, maxLength50]}
                                placeholder={model.model}
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
                                placeholder={`${model.modelYear}`}
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

ModelEdit.propTypes = {
    model: PropTypes.object.isRequired,
    dataPutModel: PropTypes.any,
    errorPutModel: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutModel: state.model.dataPutModel,
        errorPutModel: state.model.errorPutModel,
        isLoading: state.model.isLoading,
        modelPutForm: state.form.ModelPutForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutModel,
            actionSetPutModelToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'ModelPutForm',
    })(ModelEdit),
);

const queryQl = `query getModel(
  	$id: ID!
) {
    model(id: $id){
        id
        _id
    	model
        isActive
    	modelYear
    	images {
            filename
        }
    	brand {
            id
            brand
        }
        segment {
            id
            segment
        }
        versions{
            id
            version
            isActive
        }
    }
}`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/models/${context.params.modelId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    const brands = await getBrands();
    const segments = await getSegments();
    return {
        props: {
            model: data.data.model,
            brands: brands.data.brands,
            segments: segments.data.segments,
        },
    };
}
