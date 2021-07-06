import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Card, CardContent, AppBar, Toolbar, Button, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { actionPutTrim, actionSetPutTrimToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import { apiQl } from 'lib/functions';
import { TRIM_TYPES } from 'parameters';
import RenderSelect from 'components/formInputs/formInputRenderSelect';

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

const TrimEdit = (props) => {
    const {
        trim,
        dataPutTrim,
        errorPutTrim,
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
        change('trim', trim.trim);
        change('trimType', trim.trimType);
    }, [trim]);

    useEffect(() => {
        if (dataPutTrim) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Trim edited',
                errors: {},
            });
            reset();
            props.actionSetPutTrimToNull();
        }
        if (errorPutTrim) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutTrim,
            });
            props.actionSetPutTrimToNull();
        }
    }, [dataPutTrim, errorPutTrim, reset]);

    const handlePutTrimFormSubmit = () => {
        const formValues = props.trimPutForm.values;
        const values = {
            ...formValues,
            id: trim.id,
        };
        props.actionPutTrim(values);
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
            router.push(`/trims/view/${trim._id}`);
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
                        href: '/trims',
                        text: 'trims',
                    },
                    {
                        href: null,
                        text: 'trim edit',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p />
                    <Link href={`/trims/view/${router.query.trimId}`}>
                        <Button color="inherit">View</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <form onSubmit={handleSubmit(handlePutTrimFormSubmit)}>
                        <div className="form_input">
                            <Field
                                name="trim"
                                type="text"
                                label="Trim"
                                variant="outlined"
                                component={renderInput}
                            />
                        </div>
                        <div className="form_input form_select">
                            <Field
                                name="trimType"
                                label="Trim type"
                                component={RenderSelect}
                            >
                                <MenuItem key={0} aria-label="None" value="">
                                    Select
                                </MenuItem>
                                {TRIM_TYPES.map((type) => (
                                    <MenuItem value={type} key={type}>
                                        {type}
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

TrimEdit.propTypes = {
    trim: PropTypes.object.isRequired,
    dataPutTrim: PropTypes.any,
    errorPutTrim: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutTrim: state.trim.dataPutTrim,
        errorPutTrim: state.trim.errorPutTrim,
        isLoading: state.trim.isLoading,
        trimPutForm: state.form.TrimPutForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutTrim,
            actionSetPutTrimToNull,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: 'TrimPutForm',
    })(TrimEdit),
);

const queryQl = `query getTrim(
    $id: ID!
){
    trim(id: $id){
        _id
        id
        trim
        trimType
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/trims/${context.params.trimId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            trim: data.data.trim,
        },
    };
}
