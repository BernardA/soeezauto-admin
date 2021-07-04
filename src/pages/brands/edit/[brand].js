import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { maxLength, minLength } from 'tools/validator';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput, renderSwitch } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPutBrand, actionSetPutBrandToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import { capitalize } from 'tools/functions';
import { apiQl } from 'lib/functions';

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
            justifyContent: 'end',
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

const BrandEdit = (props) => {
    console.log('props', props);
    const {
        brand,
        dataPutBrand,
        errorPutBrand,
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
        if (brand) {
            setIsActive(brand.isActive);
            change('isActive', brand.isActive);
        }
    }, [brand]);

    useEffect(() => {
        if (dataPutBrand) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Brand edited',
                errors: {},
            });
            reset();
            props.actionSetPutBrandToNull();
        }
        if (errorPutBrand) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutBrand,
            });
            props.actionSetPutBrandToNull();
        }
    }, [dataPutBrand, errorPutBrand, reset]);

    const handleIsActiveChange = (event) => {
        setIsActive(event.target.checked);
    };

    const handlePutBrandFormSubmit = () => {
        console.log('values', props.brandPutForm.values);
        const values = {
            ...props.brandPutForm.values,
            id: brand.id,
            brand: props.brandPutForm.values.brand || brand.brand,
            image: props.brandPutForm.values.image || brand.image,
        };
        props.actionPutBrand(values);
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
            router.push(`/brands/view/${brand.brand}`);
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
                        href: '/brands',
                        text: 'brands',
                    },
                    {
                        href: null,
                        text: 'brand view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href={`/brands/view/${router.query.brand}`}>
                        <Button color="inherit">View</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form
                        name="contact"
                        onSubmit={handleSubmit(handlePutBrandFormSubmit)}
                    >
                        <div className="form_input">
                            <Field
                                name="brand"
                                type="text"
                                label="brand"
                                variant="outlined"
                                component={renderInput}
                                validate={[minLength5, maxLength50]}
                                placeholder={brand.brand}
                                autoFocus
                            />
                        </div>
                        <div className="form_input">
                            <Field
                                name="image"
                                type="text"
                                label="image"
                                placeholder={brand.image}
                                variant="outlined"
                                component={renderInput}
                                validate={[minLength5, maxLength50]}
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

BrandEdit.propTypes = {
    brand: PropTypes.object.isRequired,
    dataPutBrand: PropTypes.any,
    errorPutBrand: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutBrand: state.brand.dataPutBrand,
        errorPutBrand: state.brand.errorPutBrand,
        isLoading: state.brand.isLoading,
        brandPutForm: state.form.BrandPutForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutBrand,
            actionSetPutBrandToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'BrandPutForm',
    })(BrandEdit),
);

const queryQl = `query getBrand(
    $brand: [String!]
) {
    brands(
         brand_list: $brand
    ) {
        id
        brand
        isActive
        image
    }
}`;

export async function getServerSideProps(context) {
    const { brand: brandParam } = context.params;
    let brandInput = brandParam.replace(/-/g, ' ');
    if (brandParam === 'bmw') {
        brandInput = brandParam.toUpperCase();
    } else {
        brandInput = capitalize(brandParam);
    }
    const variables = {
        brand: [brandInput],
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            brand: data.data.brands[0],
        },
    };
}
