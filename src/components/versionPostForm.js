import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { MenuItem } from '@material-ui/core';
import { renderInput } from 'components/formInputs/formInputs';
import FormSubmit from 'components/formInputs/formSubmit';
import { maxLength, minLength, required } from 'tools/validator';
import RenderSelect from 'components/formInputs/formInputRenderSelect';
import { BODY_TYPES, GEARBOXES, DOORS, PLACES, TRACTIONS } from 'parameters';

const maxLength50 = maxLength(50);
const minLength5 = minLength(5);

const VersionPostForm = (props) => {
    const {
        models,
        tyres,
        taxes,
        handleSubmit,
        submitting,
        invalid,
        pristine,
        reset,
        handlePostVersionFormSubmit,
    } = props;

    const handleSetModelSelect = () => {
        const options = [
            <MenuItem key={0} aria-label="None" value="">
                Select
            </MenuItem>,
        ];
        models.forEach((model) => {
            options.push(
                <MenuItem value={model.id} key={model.id}>
                    {model.model}
                </MenuItem>,
            );
        });

        return options;
    };
    return (
        <form onSubmit={handleSubmit(handlePostVersionFormSubmit)}>
            <div className="form_input form_select">
                <Field name="model" label="model" component={RenderSelect}>
                    {handleSetModelSelect()}
                </Field>
                <span id="no_cat_search" className="form_error" />
            </div>
            <div className="form_input">
                <Field
                    name="version"
                    type="text"
                    label="version"
                    variant="outlined"
                    component={renderInput}
                    validate={[required, minLength5, maxLength50]}
                    autoFocus
                />
            </div>
            <div className="form_input">
                <Field
                    name="motor"
                    type="text"
                    label="Engine"
                    variant="outlined"
                    component={renderInput}
                    validate={[required]}
                />
            </div>
            <div className="form_input">
                <Field
                    name="measures"
                    type="text"
                    label="Measures"
                    variant="outlined"
                    component={renderInput}
                    validate={[required]}
                />
            </div>
            <div className="form_input">
                <Field
                    name="performance"
                    type="text"
                    label="Performance"
                    variant="outlined"
                    component={renderInput}
                    validate={[required]}
                />
            </div>
            <div className="form_input form_select">
                <Field
                    name="bodyType"
                    label="Body type"
                    component={RenderSelect}
                    validate={[required]}
                >
                    <MenuItem key={0} aria-label="None" value="">
                        Select
                    </MenuItem>
                    {BODY_TYPES.map((body) => (
                        <MenuItem value={body} key={body}>
                            {body}
                        </MenuItem>
                    ))}
                </Field>
                <span id="no_cat_search" className="form_error" />
            </div>
            <div className="form_input form_select">
                <Field
                    name="gearbox"
                    label="Gearbox"
                    component={RenderSelect}
                    validate={[required]}
                >
                    <MenuItem key={0} aria-label="None" value="" />
                    {GEARBOXES.map((gearbox) => (
                        <MenuItem value={gearbox} key={gearbox}>
                            {gearbox}
                        </MenuItem>
                    ))}
                </Field>
                <span id="no_cat_search" className="form_error" />
            </div>
            <div className="form_input form_select">
                <Field
                    name="places"
                    label="Places"
                    component={RenderSelect}
                    validate={[required]}
                >
                    <MenuItem key={0} aria-label="None" value="" />
                    {PLACES.map((place) => (
                        <MenuItem value={place} key={place}>
                            {place}
                        </MenuItem>
                    ))}
                </Field>
                <span id="no_cat_search" className="form_error" />
            </div>
            <div className="form_input form_select">
                <Field
                    name="doors"
                    label="Doors"
                    component={RenderSelect}
                    validate={[required]}
                >
                    <MenuItem key={0} aria-label="None" value="" />
                    {DOORS.map((door) => (
                        <MenuItem value={door} key={door}>
                            {door}
                        </MenuItem>
                    ))}
                </Field>
                <span id="no_cat_search" className="form_error" />
            </div>
            <div className="form_input form_select">
                <Field
                    name="traction"
                    label="Traction"
                    component={RenderSelect}
                    validate={[required]}
                >
                    <MenuItem key={0} aria-label="None" value="" />
                    {TRACTIONS.map((traction) => (
                        <MenuItem value={traction} key={traction}>
                            {traction}
                        </MenuItem>
                    ))}
                </Field>
                <span id="no_cat_search" className="form_error" />
            </div>
            <div className="form_input">
                <Field
                    name="gvw"
                    type="number"
                    label="GVW"
                    variant="outlined"
                    component={renderInput}
                    validate={[required]}
                />
            </div>
            <div className="form_input">
                <Field
                    name="curbWeight"
                    type="number"
                    label="Curb weight"
                    variant="outlined"
                    component={renderInput}
                    validate={[required]}
                />
            </div>
            <div className="form_input form_select">
                <Field
                    name="tyreFront"
                    label="Tyre front"
                    component={RenderSelect}
                    validate={[required]}
                >
                    <MenuItem key={0} aria-label="None" value="" />
                    {tyres.map((tyre) => (
                        <MenuItem value={tyre.id} key={tyre.id}>
                            {tyre.tyre}
                        </MenuItem>
                    ))}
                </Field>
                <span id="no_cat_search" className="form_error" />
            </div>
            <div className="form_input form_select">
                <Field name="tyreBack" label="Tyre back" component={RenderSelect}>
                    <MenuItem key={0} aria-label="None" value="" />
                    {tyres.map((tyre) => (
                        <MenuItem value={tyre.id} key={tyre.id}>
                            {tyre.tyre}
                        </MenuItem>
                    ))}
                </Field>
                <span id="no_cat_search" className="form_error" />
            </div>
            <div className="form_input form_select">
                <Field
                    name="CF"
                    label="CF"
                    component={RenderSelect}
                    validate={[required]}
                >
                    <MenuItem key={0} aria-label="None" value="" />
                    {taxes.map((tax) => (
                        <MenuItem value={tax.id} key={tax.id}>
                            {tax.CF}
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
    );
};

export default reduxForm({
    form: 'VersionPostForm',
})(VersionPostForm);
