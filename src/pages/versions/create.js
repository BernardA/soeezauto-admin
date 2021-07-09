import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardContent, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from 'components/std/loading';
import NotifierDialog from 'components/std/notifierDialog';
import { actionSetPostVersionToNull } from 'store/actions';
import Breadcrumb from 'components/std/breadcrumb';
import getModels from 'lib/getModels';
import getTyres from 'lib/getTyres';
import getTaxes from 'lib/getTaxes';
import VersionPostForm from 'components/versionPostForm';
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
        justifyContent: 'space-between',
        gap: 10,
        '& div': {
            marginBottom: 5,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const VersionCreate = (props) => {
    const { models, tyres, taxes, dataPostVersion, errorPostVersion, isLoading } = props;
    const classes = useStyles();
    const [createdVersion, setCreatedVersion] = useState([]);
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
            setCreatedVersion((prevState) => [...prevState, dataPostVersion.version._id]);
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
    }, [dataPostVersion, errorPostVersion]);

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
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div key={index}>
                            <p>
                                {createdVersion[index - 1] ? (
                                    <Link
                                        href={`/versions/view/${
                                            createdVersion[index - 1]
                                        }`}
                                    >
                                        {createdVersion[index - 1]}
                                    </Link>
                                ) : (
                                    'tbd'
                                )}
                            </p>
                            <VersionPostForm
                                models={models}
                                form={`VersionPostForm_${index}`}
                                tyres={tyres}
                                taxes={taxes}
                                index={index}
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
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionSetPostVersionToNull,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(VersionCreate);

export async function getServerSideProps() {
    const models = await getModels();
    const tyres = await getTyres();
    const taxes = await getTaxes();
    return {
        props: {
            models: models.data.models,
            tyres: tyres.data.tyres,
            taxes: taxes.data.taxes,
        },
    };
}
