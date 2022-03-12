import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    fileInput: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        placeItems: 'center',
        width: '300px',
    },
    chips: {
        display: 'grid',
        gridGap: '10px',
    },
}));

const FormInputFileReduxForm = (field) => {
    const classes = useStyles();

    const handleInputChange = (event) => {
        const {
            input: { onChange },
        } = field;
        onChange(event.target.files[0]);
    };

    const {
        meta: { touched, error },
    } = field;
    return (
        <div className={`form_input ${classes.fileInput}`}>
            <label>{field.label}</label>
            <div>
                <input
                    type="file"
                    accept={field.accept.toString()}
                    onChange={handleInputChange}
                />
            </div>
            <span className="form_error">{touched ? error : ''}</span>
        </div>
    );
};

export default FormInputFileReduxForm;
