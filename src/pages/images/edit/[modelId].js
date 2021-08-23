import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem, Switch } from '@material-ui/core';
import PropTypes from 'prop-types';
import { apiQl } from 'lib/functions';
import Image from 'next/image';
import NotifierDialog from 'components/std/notifierDialog';
import { actionPutImage, actionSetPutImageToNull } from 'store/actions';
import Loading from 'components/std/loading';

const ToggleFeatured = ({ image, handleToggleFeatured }) => {
    return (
        <Switch
            id={image.id}
            checked={image.isFeatured}
            onChange={handleToggleFeatured}
            color="primary"
        />
    );
};

const ImageEdit = (props) => {
    const { model, dataPutImage, errorPutImage, isLoading } = props;

    const [updatedModel, setUpdatedModel] = useState(model);
    const [currentImage, setCurrentImage] = useState();
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPutImage) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Image is featured toggled',
                errors: {},
            });
            const updated = updatedModel;
            updated.images.forEach((img) => {
                if (img.id === currentImage.id) {
                    // eslint-disable-next-line no-param-reassign
                    img.isFeatured = dataPutImage.image.isFeatured;
                }
            });
            setUpdatedModel(updated);
        }
        if (errorPutImage) {
            setNotification({
                status: 'error',
                title: 'Error',
                message: 'View errors',
                errors: errorPutImage,
            });
        }
    }, [dataPutImage, errorPutImage]);

    const handleToggleFeatured = (event) => {
        const imageId = event.target.id;
        const image = model.images.find((img) => {
            return img.id === imageId;
        });
        // check if other images are featured
        const anyFeatured = model.images.filter((img) => {
            return img.isFeatured && img.id !== imageId;
        });
        if (anyFeatured.length > 0) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'There is an image already featured',
                errors: {},
            });
        } else {
            setNotification({
                status: 'confirm',
                title: 'Confirmation',
                message: 'Confirm toggle featured image',
                errors: {},
            });
            setCurrentImage(image);
        }
    };

    const handleNotificationDismiss = (event) => {
        setNotification({
            status: '',
            title: '',
            message: '',
            errors: {},
        });
        if (event.target.id === 'confirmed') {
            props.actionPutImage({
                imageId: currentImage.id,
                isFeatured: !currentImage.isFeatured,
            });
        } else {
            props.actionSetPutImageToNull();
        }
    };

    return (
        <div>
            {isLoading && <Loading />}
            <List>
                {updatedModel.images.map((image) => (
                    <ListItem key={image.filename}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_HOST}/images/models/${image.filename}`}
                            alt={`${model.model}`}
                            width="105"
                            height="70"
                        />
                        <div>
                            <ToggleFeatured
                                image={image}
                                handleToggleFeatured={handleToggleFeatured}
                            />
                        </div>
                    </ListItem>
                ))}
            </List>
            <NotifierDialog
                notification={notification}
                handleNotificationDismiss={handleNotificationDismiss}
            />
        </div>
    );
};

ImageEdit.propTypes = {
    actionPutImage: PropTypes.func.isRequired,
    actionSetPutImageToNull: PropTypes.func.isRequired,
    dataPutImage: PropTypes.any,
    errorPutImage: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutImage: state.image.dataPutImage,
        errorPutImage: state.image.errorPutImage,
        isLoading: state.image.isLoading,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutImage,
            actionSetPutImageToNull,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageEdit);

const queryQl = `query getModel(
  	$id: ID!
) {
    model(id: $id){
        id
        _id
    	model
    	modelYear
    	images {
            id
            filename
            isFeatured
        }
    }
}`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/models/${context.params.modelId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            model: data.data.model,
        },
    };
}
