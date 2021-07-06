import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { required } from 'tools/validator';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPostPrice, actionSetPostPriceToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';

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

const PriceCreate = (props) => {
    const {
        dataPostPrice,
        errorPostPrice,
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
    const [createdPrice, setCreatedPrice] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostPrice) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: `Price created ${dataPostPrice.price._id}`,
                errors: {},
            });
            reset();
            props.actionSetPostPriceToNull();
            setCreatedPrice(dataPostPrice.price);
        }
        if (errorPostPrice) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostPrice,
            });
            props.actionSetPostPriceToNull();
        }
    }, [dataPostPrice, errorPostPrice, reset]);

    const handlePostPriceFormSubmit = () => {
        const formValues = props.pricePostForm.values;
        const values = {
            ...formValues,
            version: `/api/versions/${formValues.version}`,
            price: parseInt(formValues.price, 10),
            promo: formValues.promo ? parseInt(formValues.promo, 10) : undefined,
        };
        props.actionPostPrice(values);
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
            router.push(`/prices/view/${createdPrice._id}`);
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
                        href: '/prices',
                        text: 'prices',
                    },
                    {
                        href: null,
                        text: 'price create',
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
                    <form onSubmit={handleSubmit(handlePostPriceFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="version"
                                type="text"
                                label="Version"
                                variant="outlined"
                                validate={[required]}
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="price"
                                type="number"
                                label="Price"
                                variant="outlined"
                                component={renderInput}
                                validate={[required]}
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="promo"
                                type="number"
                                label="Promo"
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

PriceCreate.propTypes = {
    dataPostPrice: PropTypes.any,
    errorPostPrice: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostPrice: state.price.dataPostPrice,
        errorPostPrice: state.price.errorPostPrice,
        isLoading: state.price.isLoading,
        pricePostForm: state.form.PricePostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostPrice,
            actionSetPostPriceToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'PricePostForm',
    })(PriceCreate),
);
