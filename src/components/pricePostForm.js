import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormGroup, Fab, Button } from '@material-ui/core';
import { renderInput } from 'components/formInputs/formInputs';
import { actionPostPrice } from 'store/actions';
import { Clear } from '@material-ui/icons';
import { required } from 'tools/validator';

const PricePostForm = (props) => {
    const { version, handleSubmit, submitting, invalid, pristine, reset, change } = props;

    useEffect(() => {
        if (version) {
            change('version', version.id);
        }
    }, []);

    const handleFormSubmit = (values) => {
        const formValues = {
            ...values,
            price: parseInt(values.price, 10),
            promo: values.promo ? parseInt(values.promo, 10) : undefined,
        };
        props.actionPostPrice(formValues);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form_input">
                <Field
                    name="version"
                    type="text"
                    label={version.version}
                    variant="outlined"
                    helperText={version.id}
                    component={renderInput}
                    validate={[required]}
                />
            </div>
            <div className="form_input">
                <Field
                    name="price"
                    type="number"
                    label="Price"
                    variant="outlined"
                    helperText={
                        (version.prices &&
                            version.prices.edges &&
                            version.prices.edges[0]?.node?.price) ||
                        'n/a'
                    }
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
                    helperText={
                        (version.prices &&
                            version.prices.edges &&
                            version.prices.edges[0]?.node?.promo) ||
                        'n/a'
                    }
                    component={renderInput}
                />
            </div>
            <div className="form_input form_submit">
                <FormGroup row>
                    <Fab
                        disabled={pristine || submitting}
                        onClick={reset}
                        variant="round"
                        color="secondary"
                        size="small"
                        type="reset"
                        aria-label="effacer"
                    >
                        <Clear />
                    </Fab>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={pristine || submitting || invalid}
                        name="_submit"
                        type="submit"
                        aria-label="envoyer"
                    >
                        Envoyer
                    </Button>
                </FormGroup>
            </div>
        </form>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostPrice,
        },
        dispatch,
    );
}

export default connect(null, mapDispatchToProps)(reduxForm()(PricePostForm));
