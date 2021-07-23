import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPutPrice, actionSetPutPriceToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import { apiQl } from 'lib/functions';

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

const PriceEdit = (props) => {
    const {
        price,
        dataPutPrice,
        errorPutPrice,
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
        change('price', price.price);
        price.promo && change('promo', price.promo);
    }, [price]);

    useEffect(() => {
        if (dataPutPrice) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Price edited',
                errors: {},
            });
            reset();
            props.actionSetPutPriceToNull();
        }
        if (errorPutPrice) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutPrice,
            });
            props.actionSetPutPriceToNull();
        }
    }, [dataPutPrice, errorPutPrice, reset]);

    const handlePutPriceFormSubmit = () => {
        const formValues = props.pricePutForm.values;
        const values = {
            ...formValues,
            id: price.id,
            price: formValues.price ? parseInt(formValues.price, 10) : undefined,
            promo: formValues.promo ? parseInt(formValues.promo, 10) : undefined,
        };
        props.actionPutPrice(values);
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
            router.push(`/prices/view/${price._id}`);
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
                        text: 'price edit',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href="/prices/create">
                        <Button color="inherit">Create</Button>
                    </Link>
                    <Link href={`/prices/view/${router.query.priceId}`}>
                        <Button color="inherit">View</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form onSubmit={handleSubmit(handlePutPriceFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="price"
                                type="number"
                                label="Price"
                                variant="outlined"
                                component={renderInput}
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

PriceEdit.propTypes = {
    price: PropTypes.object.isRequired,
    dataPutPrice: PropTypes.any,
    errorPutPrice: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutPrice: state.price.dataPutPrice,
        errorPutPrice: state.price.errorPutPrice,
        isLoading: state.price.isLoading,
        pricePutForm: state.form.PricePutForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutPrice,
            actionSetPutPriceToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'PricePutForm',
    })(PriceEdit),
);

const queryQl = `query getPrice(
    $id: ID!
){
    price(id: $id){
        _id
        id
        version {
            id
        }
        price
        promo
        createdAt
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/prices/${context.params.priceId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            price: data.data.price,
        },
    };
}
