import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardContent, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { actionPostVersion, actionSetPostVersionToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import getModels from 'lib/getModels';
import getTyres from 'lib/getTyres';
import VersionPostForm from 'components/versionPostForm';

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
        display: 'grid',
        gridTemplateColumns: '300px',
        justifyContent: 'center',
        '& div': {
            marginBottom: 5,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const VersionCreate = (props) => {
    const { models, tyres, dataPostVersion, errorPostVersion, isLoading, reset } = props;
    const classes = useStyles();
    const [createdVersion, setCreatedVersion] = useState(null);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        if (dataPostVersion) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Success',
                message: 'Version created',
                errors: {},
            });
            props.actionSetPostVersionToNull();
            setCreatedVersion(dataPostVersion.version.id);
        }
        if (errorPostVersion) {
            setNotification({
                status: 'ok_and_dismiss',
                title: 'Error',
                message: 'See below',
                errors: errorPostVersion,
            });
            props.actionSetPostVersionToNull();
        }
    }, [dataPostVersion, errorPostVersion, reset]);

    const handlePostVersionFormSubmit = () => {
        const formValues = props.versionPostForm.values;
        const values = {
            ...formValues,
            motorId: `/api/motors/${formValues.motor}`,
            measureId: `/api/measures/${formValues.measures}`,
            performanceId: `/api/performances/${formValues.performance}`,
            gvw: parseInt(formValues.gvw, 10),
            curbWeight: parseInt(formValues.curbWeight, 10),
        };
        props.actionPostVersion(values);
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
                        href: '/versions',
                        text: 'versions',
                    },
                    {
                        href: null,
                        text: 'version create',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p />
                    <p />
                </Toolbar>
            </AppBar>
            <Card id="noShadow">
                <CardContent className={classes.cardContent}>
                    <div>
                        <p>{createdVersion && createdVersion.id}</p>
                        <VersionPostForm
                            models={models}
                            tyres={tyres}
                            handlePostVersionFormSubmit={handlePostVersionFormSubmit}
                        />
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

VersionCreate.propTypes = {
    dataPostVersion: PropTypes.any,
    errorPostVersion: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPostVersion: state.version.dataPostVersion,
        errorPostVersion: state.version.errorPostVersion,
        isLoading: state.version.isLoading,
        versionPostForm: state.form.VersionPostForm,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPostVersion,
            actionSetPostVersionToNull,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(VersionCreate);

export async function getServerSideProps() {
    const models = await getModels();
    const tyres = await getTyres();
    return {
        props: {
            models: models.data.models,
            tyres: tyres.data.tyres,
        },
    };
}
