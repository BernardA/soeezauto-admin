import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
    Card,
    CardContent,
    AppBar,
    Toolbar,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import getBrandsModels from 'lib/getBrandsModels';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPostImage, actionSetPostImageToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import { urlWriter } from 'tools/functions';
import router from 'next/router';

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

const ImageCreate = (props) => {
    const {
        brands,
        dataPostImage,
        errorPostImage,
        isLoading,
        handleSubmit,
        submitting,
        invalid,
        error,
        pristine,
        reset,
    } = props;
    const classes = useStyles();
    const [totalPostImage, setTotalPostImage] = useState(null);
    const [currentPostImage, setCurrentPostImage] = useState(null);
    const [modelSelect, setModelSelect] = useState('Choisir');
    const [model, setModel] = useState(null);
    const [brand, setBrand] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostImage) {
            if (currentPostImage === totalPostImage) {
                setNotification({
                    status: 'ok_and_dismiss',
                    title: 'Success',
                    message: 'Images created',
                    errors: {},
                });
                reset();
            } else {
                const values = {
                    model: model.id,
                    filename: `${urlWriter(brand)}-${urlWriter(model.model)}-${
                        model.modelYear
                    }-${currentPostImage + 1}.jpeg`,
                };
                setCurrentPostImage((prevState) => prevState + 1);
                props.actionPostImage(values);
            }
            props.actionSetPostImageToNull();
        }
        if (errorPostImage) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostImage,
            });
            props.actionSetPostImageToNull();
        }
    }, [dataPostImage, errorPostImage, reset]);

    const handlePostImageFormSubmit = () => {
        const formValues = props.imagePostForm.values;
        setTotalPostImage(parseInt(formValues.quantity, 10));
        // const qty = Array.from({ length: formValues.quantity }, (v, k) => k);
        const values = {
            model: model.id,
            filename: `${urlWriter(brand)}-${urlWriter(model.model)}-${
                model.modelYear
            }-${1}.jpeg`,
        };
        setCurrentPostImage(1);
        props.actionPostImage(values);
    };

    const handleSetModelSelect = () => {
        const options = [];
        brands.forEach((bra) => {
            bra.models.forEach((mod) => {
                options.push(
                    <MenuItem value={mod.id} key={mod.id}>
                        {`${bra.brand} ${mod.model}`}
                    </MenuItem>,
                );
            });
        });

        return options;
    };
    const handleModelSelectChange = (event) => {
        setModelSelect(event.target.value);
        let selectedModel = null;
        brands.forEach((bra) => {
            if (!selectedModel || selectedModel.length === 0) {
                selectedModel = bra.models.filter((mod) => {
                    return mod.id === event.target.value;
                });
                if (selectedModel.length > 0) {
                    setBrand(bra.brand);
                }
            }
        });
        setModel(selectedModel[0]);
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
            router.push(`/images/edit/${model._id}`);
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
                        href: '/images',
                        text: 'images',
                    },
                    {
                        href: null,
                        text: 'image create',
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
                    <form onSubmit={handleSubmit(handlePostImageFormSubmit)}>
                        <FormControl variant="outlined">
                            <InputLabel id="model-select-label">
                                Choisir modèle
                            </InputLabel>
                            <Select
                                labelId="model-select-label"
                                id="model-select"
                                name="model"
                                label="Choisir modèle"
                                value={modelSelect}
                                onChange={handleModelSelectChange}
                                variant="outlined"
                            >
                                <MenuItem key={0} aria-label="Choisir" value="Choisir">
                                    Choisir
                                </MenuItem>
                                {handleSetModelSelect()}
                            </Select>
                            <span id="no_cat_search" className="form_error" />
                        </FormControl>
                        <div className="form_input">
                            <Field
                                name="quantity"
                                type="number"
                                label="Image quantity"
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

ImageCreate.propTypes = {
    dataPostImage: PropTypes.any,
    errorPostImage: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostImage: state.image.dataPostImage,
        errorPostImage: state.image.errorPostImage,
        isLoading: state.image.isLoading,
        imagePostForm: state.form.ImagePostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostImage,
            actionSetPostImageToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'ImagePostForm',
    })(ImageCreate),
);

export async function getServerSideProps() {
    const brands = await getBrandsModels();
    return {
        props: {
            brands: brands.data.brands,
        },
    };
}
