import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    AppBar,
    Toolbar,
    List,
    ListItem,
    Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { normalizeSync } from 'normalize-diacritics';
import PropTypes from 'prop-types';
import getBrandsModels from 'lib/getBrandsModels';
import getTrims from 'lib/getTrims';
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
    views: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '10px',
        justifyContent: 'space-around',
        '& > div': {
            flex: '0 0 500px',
            margin: '20px 0',
            height: 300,
            overflow: 'scroll',
        },
    },
    trimItem: {
        margin: 0,
        padding: 0,
        '& p': {
            margin: '5px 0',
            padding: 0,
        },
    },
    trimRemove: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& svg': {
            cursor: 'pointer',
        },
    },
}));

const Versiontrims = (props) => {
    const classes = useStyles();
    const {
        brands,
        trims,
        dataGetVersionTrims,
        errorGetVersionTrims,
        dataPutVersionTrims,
        errorPutVersionTrims,
        isLoading,
    } = props;
    const [modelSelect, setModelSelect] = useState('Choisir');
    const [versionSelect, setVersionSelect] = useState('Choisir');
    const [currentVersion, setCurrentVersion] = useState(null);
    const [optionsVersion, setOptionsVersion] = useState(null);
    const [trimsAll, setTrimsAll] = useState([]);
    const [trimsMatches, setTrimsMatches] = useState([]);
    const [trimsToAdd, setTrimsToAdd] = useState([]);
    const [trimsToDelete, setTrimsToDelete] = useState([]);
    const [valueSelectTrim, setValueSelectTrim] = useState('');
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataGetVersionTrims) {
            setCurrentVersion(dataGetVersionTrims);
            setTrimsAll(dataGetVersionTrims.trims);
            setTrimsToDelete([]);
            setTrimsToAdd([]);
            setTrimsMatches([]);
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
            setTrimsToAdd([]);
            setTrimsToDelete([]);
            setTrimsMatches([]);
            props.actionGetVersionTrims(currentVersion.id);
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

    const handleVersionSelectChange = (event) => {
        setVersionSelect(event.target.value);
        if (event.target.value !== 'Choisir') {
            props.actionGetVersionTrims(event.target.value);
        }
        return null;
    };

    const handleReset = () => {
        setCurrentVersion(null);
        setModelSelect('Choisir');
        setVersionSelect('Choisir');
        setTrimsAll([]);
        setTrimsToAdd([]);
        setTrimsToDelete([]);
        setTrimsMatches([]);
    };

    const handleUpdateSelect = () => {
        // create array of trims ids
        let all = trimsAll.map((a) => a.id);
        let add = trimsToAdd.map((a) => a.id);
        let del = trimsToDelete.map((a) => a.id);
        // remove common items in add and delete if any
        if (add.length > 0 && del.length > 0) {
            const common = new Set(add.filter((val) => del.includes(val)));
            add = add.filter((x) => !common.has(x));
            del = del.filter((x) => !common.has(x));
        }
        // remove del items from all
        const delSet = new Set([...del]);
        all = all.filter((x) => !delSet.has(x));
        const values = {
            id: currentVersion.id,
            trims: [...all, ...add],
        };
        props.actionPutVersionTrims(values);
    };

    const handleAddTrims = () => {
        // check if trim does not already included in delete list
        const alreadyInToAdd = trimsToAdd.filter((trim) => {
            return trim.id === valueSelectTrim.id;
        });
        const alreadyInAll = trimsAll.filter((trim) => {
            return trim.id === valueSelectTrim.id;
        });
        if (alreadyInToAdd.length > 0 || alreadyInAll.length > 0) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'Trim already included in add or all list',
                errors: {},
            });
        } else {
            setTrimsToAdd((prevState) => [...prevState, valueSelectTrim]);
        }
        setValueSelectTrim('');
    };

    const handleDeleteTrims = () => {
        // check if trim exists in trims all
        const match = trimsAll.filter((trim) => {
            return trim.id === valueSelectTrim.id;
        });
        if (match.length === 0) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'Trim does not exist in version',
                errors: {},
            });
        } else {
            // check if trim does not already included in delete list
            const alreadyIn = trimsToDelete.filter((trim) => {
                return trim.id === valueSelectTrim.id;
            });
            if (alreadyIn.length > 0) {
                setNotification({
                    status: 'ok_and_dismiss',
                    title: 'Error',
                    message: 'Trim already included in delete list',
                    errors: {},
                });
            } else {
                setTrimsToDelete((prevState) => [...prevState, valueSelectTrim]);
            }
        }
        setValueSelectTrim('');
    };

    const handleRemoveAddTrim = (event) => {
        const filter = trimsToAdd.filter((trim) => {
            return trim.id !== event.target.id;
        });
        setTrimsToAdd([...filter]);
    };

    const handleRemoveDeleteTrim = (event) => {
        const filter = trimsToDelete.filter((trim) => {
            return trim.id !== event.target.id;
        });
        setTrimsToDelete([...filter]);
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
                        href: null,
                        text: 'versiontrims',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href="/versiontrims/comparison">
                        <Button color="inherit">Comparison</Button>
                    </Link>
                    <Link href="/versiontrims/copy">
                        <Button color="inherit">Copy trims</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div className={classes.views}>
                <Card>
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
                    </CardContent>
                </Card>
                <Card className={classes.cardRoot}>
                    <CardHeader title="Version change" />
                    <CardContent className={classes.cardContent}>
                        {trims && (
                            <Autocomplete
                                id="select2"
                                value={valueSelectTrim}
                                onChange={(event, newValue) => {
                                    setValueSelectTrim(newValue);
                                }}
                                options={trims}
                                getOptionLabel={(option) => option.trimNormal}
                                disabled={!currentVersion}
                                renderInput={(params) => (
                                    <TextField
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...params}
                                        label="Select trim"
                                        variant="outlined"
                                    />
                                )}
                            />
                        )}
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleAddTrims} variant="contained">
                            Add
                        </Button>
                        <Button onClick={handleDeleteTrims} variant="contained">
                            Delete
                        </Button>
                        <Button
                            onClick={handleUpdateSelect}
                            variant="contained"
                            disabled={
                                trimsToAdd.length === 0 && trimsToDelete.length === 0
                            }
                        >
                            Update
                        </Button>
                    </CardActions>
                </Card>
            </div>
            <div className={classes.views}>
                <Card>
                    <CardHeader
                        title="Matches"
                        subheader={<Chip label={trimsMatches.length} />}
                    />
                    <CardContent>
                        {trimsMatches.length > 0 && (
                            <List>
                                {trimsMatches.map((trim) => (
                                    <ListItem key={trim.id}>{trim.trim}</ListItem>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        title="To add"
                        subheader={<Chip label={trimsToAdd.length} />}
                    />
                    <CardContent>
                        {trimsToAdd.length > 0 && (
                            <List>
                                {trimsToAdd.map((trim) => (
                                    <ListItem key={trim.id} className={classes.trimItem}>
                                        <div className={classes.trimRemove}>
                                            <p>{trim.trim}</p>
                                            <Close
                                                id={trim.id}
                                                onClick={handleRemoveAddTrim}
                                            />
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        title="To delete"
                        subheader={<Chip label={trimsToDelete.length} />}
                    />
                    <CardContent>
                        {trimsToDelete.length > 0 && (
                            <List>
                                {trimsToDelete.map((trim) => (
                                    <ListItem key={trim.id}>
                                        {' '}
                                        <div className={classes.trimRemove}>
                                            <p>{trim.trim}</p>
                                            <Close
                                                id={trim.id}
                                                onClick={handleRemoveDeleteTrim}
                                            />
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        title="All"
                        subheader={<Chip label={trimsAll.length} />}
                    />
                    <CardContent>
                        {trimsAll.length > 0 && (
                            <List>
                                {trimsAll.map((trim) => (
                                    <ListItem key={trim.id}>{trim.trim}</ListItem>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>
            </div>
            <NotifierDialog
                notification={notification}
                handleNotificationDismiss={handleNotificationDismiss}
            />
        </div>
    );
};

Versiontrims.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Versiontrims);

export async function getServerSideProps() {
    const brands = await getBrandsModels();
    const trims = await getTrims();
    const trimsNormal = trims.data.trims.map((trim) => {
        return { ...trim, trimNormal: normalizeSync(trim.trim) };
    });
    return {
        props: {
            brands: brands.data.brands,
            trims: trimsNormal,
        },
    };
}
