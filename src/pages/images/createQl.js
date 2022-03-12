import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
    Card,
    CardContent,
    AppBar,
    Toolbar,
    MenuItem,
    FormControl,
    Chip,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import getBrandsModels from 'lib/getBrandsModels';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { DeleteOutlined } from '@material-ui/icons/';
import FormInputFileReduxForm from 'components/formInputs/formInputFileReduxForm';
import RenderSelect from 'components/formInputs/formInputRenderSelect';
import { actionPostImage, actionSetPostImageToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import { urlWriter } from 'tools/functions';
import { MODEL_IMAGE_ACCEPTED_MIME_TYPES, UPLOAD_MAX_SIZE } from 'parameters';

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

const ImageQlPostForm = (props) => {
    const { brands, dataPostImage, errorPostImage, isLoading, error, reset } = props;

    const classes = useStyles();
    const [uploadErrors, setUploadErrors] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostImage) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Images created',
                errors: {},
            });
            reset();
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
        const formValues = props.imageQlPostForm.values;

        // const qty = Array.from({ length: formValues.quantity }, (v, k) => k);
        const brand = brands.models.filter((mod) => {
            return mod.id === formValues.model;
        });
        formValues.filename = `${urlWriter(brand.brand)}-${urlWriter(
            brand.model.model,
        )}-${brand.model.modelYear}-${1}.jpeg`;

        // props.actionPostImage(values);
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

    const handleFileSelected = (event) => {
        const file = event.target.files[0];
        const errors = [];
        if (file) {
            if (!MODEL_IMAGE_ACCEPTED_MIME_TYPES.includes(file.type)) {
                errors.push(`Invalid type (${MODEL_IMAGE_ACCEPTED_MIME_TYPES})`);
            }
            if (file.size > UPLOAD_MAX_SIZE) {
                errors.push(`File size (${UPLOAD_MAX_SIZE / 1000000} Mb)`);
            }
            setUploadErrors(errors);
            setSelectedFile(file);
        }
    };

    const handleDeleteFileSelected = () => {
        document.getElementById('selected_file').innerHTML = '';
        document.getElementById('file_holder').classList.add('no_show');
        document.getElementById('file_submit').classList.add('no_show');
        document.getElementById('file_select').classList.remove('no_show');
        document.getElementById('img_crop').classList.add('no_show');
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
                    <form onSubmit={handlePostImageFormSubmit}>
                        <FormControl variant="outlined">
                            <Field
                                name="model"
                                label="Choisir modèle"
                                component={RenderSelect}
                            >
                                <MenuItem aria-label="None" value="">
                                    Select
                                </MenuItem>
                                {handleSetModelSelect()}
                            </Field>
                            <span id="no_cat_search" className="form_error" />
                        </FormControl>
                        <Field
                            formInputId="file_select"
                            handleFileSelected={handleFileSelected}
                            name="image"
                            accept={['image/jpeg']}
                            maxFiles={1}
                            allowedFileTypes="jpeg"
                            isImageOnly
                            component={FormInputFileReduxForm}
                            isDisabled={!!selectedFile}
                        />
                        <div id="file_holder" className="no_show">
                            <Chip
                                id="delete_file"
                                label={<p id="selected_file" />}
                                onClick={handleDeleteFileSelected}
                                icon={<DeleteOutlined />}
                            />
                        </div>
                        <div>
                            <ul className="form_error">
                                {uploadErrors &&
                                    uploadErrors.map((upError) => (
                                        <li key={upError}>{upError}</li>
                                    ))}
                            </ul>
                        </div>
                        <div id="file_submit">
                            <Button
                                name="form[save]"
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
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

ImageQlPostForm.propTypes = {
    dataPostImage: PropTypes.any,
    errorPostImage: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostImage: state.image.dataPostImage,
        errorPostImage: state.image.errorPostImage,
        isLoading: state.image.isLoading,
        imageQlPostForm: state.form.ImageQlPostForm,
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
        form: 'ImageQlPostForm',
    })(ImageQlPostForm),
);

export async function getServerSideProps() {
    const brands = await getBrandsModels();
    return {
        props: {
            brands: brands.data.brands,
        },
    };
}
