import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Card,
    CardContent,
    AppBar,
    Toolbar,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import getModels from 'lib/getModels';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { actionSetPostPriceToNull, actionGetModel } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import PricePostForm from 'components/pricePostForm';
import Link from 'components/std/link';

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
    cardContentForms: {
        width: '100%',
        margin: '0 auto',
        '& > div': {
            marginBottom: 5,
            display: 'flex',
            gap: 20,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
        '& form': {
            display: 'flex',
            gap: 20,
        },
        '& .form_submit > div': {
            gap: 20,
        },
    },
    created: {
        width: 40,
        fontWeight: 800,
    },
}));

const PriceCreate = (props) => {
    const {
        models,
        dataPostPrice,
        errorPostPrice,
        isLoading,
        isLoadingModel,
        dataGetModel,
        errorGetModel,
        reset,
    } = props;
    const classes = useStyles();
    const [modelSelect, setModelSelect] = useState('Choisir');
    const [model, setModel] = useState(null);
    const [createdPrices, setCreatedPrices] = useState([]);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostPrice) {
            // find position to insert created price info
            const versionId = dataPostPrice.price.version.id;
            let index = null;
            model.versions.forEach((version, ind) => {
                if (version.id === versionId) {
                    index = ind;
                }
            });
            setCreatedPrices((prevState) => {
                const newState = [...prevState];
                newState[index] = dataPostPrice.price._id;
                return [...newState];
            });
            props.actionSetPostPriceToNull();
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

    useEffect(() => {
        if (dataGetModel) {
            setModel(dataGetModel);
        }
        if (errorGetModel) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostPrice,
            });
            props.actionSetGetModelToNull();
        }
    }, [dataGetModel, errorGetModel]);

    const handleSetModelSelect = () => {
        const options = [
            <MenuItem key={0} aria-label="None" value="">
                Select
            </MenuItem>,
        ];
        models.forEach((mod) => {
            options.push(
                <MenuItem value={mod.id} key={mod.id}>
                    {mod.model}
                </MenuItem>,
            );
        });

        return options;
    };

    const handleModelSelectChange = (event) => {
        setModelSelect(event.target.value);
        setCreatedPrices([]);
        props.actionGetModel(event.target.value);
    };

    const handleNotificationDismiss = () => {
        setNotification({
            status: '',
            title: '',
            message: '',
            errors: {},
        });
    };

    return (
        <div>
            {isLoading || isLoadingModel ? <Loading /> : null}
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
            <Card>
                <CardContent className={classes.cardContent}>
                    <FormControl variant="outlined">
                        <InputLabel id="model-select-label">Choisir modèle</InputLabel>
                        <Select
                            labelId="model-select-label"
                            id="model-select"
                            name="model"
                            label="Choisir modèle"
                            value={modelSelect}
                            onChange={handleModelSelectChange}
                            variant="outlined"
                        >
                            <MenuItem key={0} aria-label="Choisir" value="Choisir">
                                Choisir
                            </MenuItem>
                            {handleSetModelSelect()}
                        </Select>
                        <span id="no_cat_search" className="form_error" />
                    </FormControl>
                </CardContent>
            </Card>
            <Card>
                <CardContent className={classes.cardContentForms}>
                    {model &&
                        model.versions.map((version, index) => (
                            <div key={version.id}>
                                <p className={classes.created}>
                                    {' '}
                                    {createdPrices[index] ? (
                                        <Link
                                            href={`/prices/view/${createdPrices[index]}`}
                                        >
                                            {createdPrices[index]}
                                        </Link>
                                    ) : (
                                        'tbd'
                                    )}
                                </p>
                                <PricePostForm
                                    version={version}
                                    form={`PricePostForm_${index}`}
                                />
                            </div>
                        ))}
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
    dataGetModel: PropTypes.any,
    errorGetModel: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        dataPostPrice: state.price.dataPostPrice,
        errorPostPrice: state.price.errorPostPrice,
        isLoading: state.price.isLoading,
        dataGetModel: state.model.dataGetModel,
        errorGetModel: state.model.errorGetModel,
        isLoadingModel: state.model.isLoading,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionSetPostPriceToNull,
            actionGetModel,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceCreate);

export async function getServerSideProps() {
    const models = await getModels();
    return {
        props: {
            models: models.data.models,
        },
    };
}
