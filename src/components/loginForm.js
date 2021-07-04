import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Link from 'components/std/link';
import { required, isEmail, isSpace } from 'tools/validator';
import styles from 'styles/login.module.scss';
import { renderInput } from './formInputs/formInputs';
import RenderPassword from './formInputs/formRenderPassword';

class LoginForm extends React.Component {
    render() {
        const { handleSubmit, invalid, submitting, error, submitLogin } = this.props;
        if (error) {
            return <div>{error.messageKey}</div>;
        }
        return (
            <form name="login_form" onSubmit={handleSubmit(submitLogin)}>
                <div className="form_input">
                    <Field
                        name="username"
                        type="email"
                        label="Email"
                        component={renderInput}
                        validate={[required, isEmail]}
                        autoFocus
                        variant="outlined"
                    />
                </div>

                <div className="form_input">
                    <Field
                        name="password"
                        label="Password"
                        variant="outlined"
                        component={RenderPassword}
                        validate={[required, isSpace]}
                    />
                </div>
                <div className={styles.forgotPassword}>
                    <Link href="/redefinir-senha/solicitacao">Forgot password?</Link>
                </div>
                <Button
                    className={styles.button}
                    variant="contained"
                    fullWidth
                    color="primary"
                    disabled={submitting || invalid}
                    name="_submit"
                    type="submit"
                    aria-label="connect"
                >
                    Login
                </Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    submitLogin: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
    form: 'LoginForm',
})(LoginForm);
