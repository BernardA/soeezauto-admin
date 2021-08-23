import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Card,
    CardHeader,
    CardContent,
    AppBar,
    Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import getBrandsModels from 'lib/getBrandsModels';
import {
    actionGetVersionTrims,
    actionSetGetVersionTrimsToNull,
    actionPutVersionTrims,
    actionSetPutVersionTrimsToNull,
} from 'store/actions';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import Breadcrumb from 'components/std/breadcrumb';
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
            justifyContent: 'end',
        },
    },
    cardRoot: {
        width: 300,
        margin: '20px auto',
    },
    cardContent: {
        '& div': {
            marginBottom: 5,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
    destVersion: {
        margin: '20px 0',
    },
}));

const VersiontrimCopy = (props) => {
    const classes = useStyles();
    const {
        brands,
        isLoading,
        dataGetVersionTrims,
        errorGetVersionTrims,
        dataPutVersionTrims,
        errorPutVersionTrims,
    } = props;
    const [modelSelect, setModelSelect] = useState('Choisir');
    const [versionSelect, setVersionSelect] = useState('Choisir');
    const [destVersionSelect, setDestVersionSelect] = useState('Choisir');
    const [optionsVersion, setOptionsVersion] = useState(null);
    const [optionsDestVersion, setOptionsDestVersion] = useState(null);
    const [trimsAll, setTrimsAll] = useState([]);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    const handleSetModelSelect = () => {
        const options = [];
        brands.forEach((brand) => {
            brand.models.forEach((mod) => {
                options.push(
                    <MenuItem value={mod.id} key={mod.id}>
                        {`${brand.brand} ${mod.model}`}
                    </MenuItem>,
                );
            });
        });

        return options;
    };

    const handleModelSelectChange = (event) => {
        setModelSelect(event.target.value);
    };

    useEffect(() => {
        if (modelSelect && modelSelect !== 'Choisir') {
            let selectedModel = null;
            brands.forEach((bra) => {
                if (!selectedModel) {
                    const sel = bra.models.filter((model) => {
                        return model.id === modelSelect;
                    });
                    selectedModel = sel[0];
                }
            });
            const options = [];
            selectedModel.versions.forEach((version) => {
                options.push(
                    <MenuItem value={version.id} key={version.id}>
                        {version.version}
                    </MenuItem>,
                );
            });
            setOptionsVersion([...options]);
        }
    }, [modelSelect]);

    useEffect(() => {
        if (dataGetVersionTrims) {
            setTrimsAll(dataGetVersionTrims.trims);
            props.actionSetGetVersionTrimsToNull();
        }
        if (errorGetVersionTrims) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorGetVersionTrims,
            });
            props.actionSetGetVersionTrimsToNull();
        }
    }, [dataGetVersionTrims, errorGetVersionTrims]);

    useEffect(() => {
        if (dataPutVersionTrims) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Trims copied',
                errors: {},
            });
            props.actionSetPutVersionTrimsToNull();
        }
        if (errorPutVersionTrims) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPutVersionTrims,
            });
            props.actionSetPutVersionTrimsToNull();
        }
    }, [dataPutVersionTrims, errorPutVersionTrims]);

    const handleVersionSelectChange = (event) => {
        setVersionSelect(event.target.value);
        if (event.target.value !== 'Choisir') {
            props.actionGetVersionTrims(event.target.value);
            // set options for dest version
            const remaining = optionsVersion.filter((opt) => {
                return opt.key !== event.target.value;
            });
            setOptionsDestVersion([...remaining]);
        }
        return null;
    };
    const handleDestVersionSelectChange = (event) => {
        if (event.target.value !== 'Choisir') {
            setDestVersionSelect(event.target.value);
            const trims = trimsAll.map((tr) => tr.id);
            const values = {
                id: event.target.value,
                trims,
            };
            props.actionPutVersionTrims(values);
        }
    };

    const handleReset = () => {
        setModelSelect('Choisir');
        setVersionSelect('Choisir');
        setDestVersionSelect('Choisir');
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
            {isLoading ? <Loading /> : null}
            <Breadcrumb
                links={[
                    {
                        href: '/versiontrims',
                        text: 'versiontrims',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href="/versiontrims">
                        <Button color="inherit">Versiontrims</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Card className={classes.cardRoot}>
                <CardHeader title="Select version" />
                <CardContent className={classes.cardContent}>
                    <form>
                        <div className="form_input form_select">
                            <FormControl variant="outlined">
                                <InputLabel id="model-select-label">
                                    Choisir modèle
                                </InputLabel>
                                <Select
                                    labelId="model-select-label"
                                    id="model-select"
                                    name="model"
                                    label="Choisir modèle"
                                    value={modelSelect}
                                    onChange={handleModelSelectChange}
                                    variant="outlined"
                                >
                                    <MenuItem
                                        key={0}
                                        aria-label="Choisir"
                                        value="Choisir"
                                    >
                                        Choisir
                                    </MenuItem>
                                    {handleSetModelSelect()}
                                </Select>
                                <span id="no_cat_search" className="form_error" />
                            </FormControl>
                        </div>
                        <div className="form_input form_select">
                            <FormControl variant="outlined">
                                <InputLabel id="version-select-label">
                                    Choisir version
                                </InputLabel>
                                <Select
                                    labelId="version-select-label"
                                    id="version-select"
                                    name="version"
                                    label="Choisir version"
                                    value={versionSelect}
                                    onChange={handleVersionSelectChange}
                                    variant="outlined"
                                >
                                    <MenuItem
                                        key={0}
                                        aria-label="Choisir"
                                        value="Choisir"
                                    >
                                        Choisir
                                    </MenuItem>
                                    {optionsVersion}
                                </Select>
                                <span id="no_cat_search" className="form_error" />
                            </FormControl>
                        </div>
                        <Button variant="outlined" onClick={handleReset}>
                            Reset
                        </Button>
                    </form>
                    <div className={classes.destVersion}>
                        <FormControl variant="outlined">
                            <InputLabel id="destVersion-select-label">
                                Choisir version
                            </InputLabel>
                            <Select
                                labelId="destVersion-select-label"
                                id="destVersion-select"
                                name="destVersion"
                                label="Choisir version"
                                value={destVersionSelect}
                                onChange={handleDestVersionSelectChange}
                                variant="outlined"
                            >
                                <MenuItem key={0} aria-label="Choisir" value="Choisir">
                                    Choisir
                                </MenuItem>
                                {optionsDestVersion}
                            </Select>
                            <span id="no_cat_search" className="form_error" />
                        </FormControl>
                    </div>
                </CardContent>
            </Card>
            <NotifierDialog
                notification={notification}
                handleNotificationDismiss={handleNotificationDismiss}
            />
        </div>
    );
};

VersiontrimCopy.propTypes = {
    brands: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataGetVersionTrims: state.version.dataGetVersionTrims,
        errorGetVersionTrims: state.version.errorGetVersionTrims,
        dataPutVersionTrims: state.version.dataPutVersionTrims,
        errorPutVersionTrims: state.version.errorPutVersionTrims,
        isLoading: state.version.isLoading,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionGetVersionTrims,
            actionSetGetVersionTrimsToNull,
            actionPutVersionTrims,
            actionSetPutVersionTrimsToNull,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(VersiontrimCopy);

export async function getServerSideProps() {
    const brands = await getBrandsModels();
    return {
        props: {
            brands: brands.data.brands,
        },
    };
}
