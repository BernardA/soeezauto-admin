import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch } from '@material-ui/core';
import PropTypes from 'prop-types';
import NotifierDialog from 'components/std/notifierDialog';
import { actionPutVersion } from 'store/actions';

const VersionToggleActive = (props) => {
    const { versionId, initialActive } = props;

    const [active, setActive] = useState(false);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    useEffect(() => {
        setActive(initialActive);
    }, [initialActive]);

    const handleToggleActive = () => {
        setNotification({
            status: 'confirm',
            title: 'Confirmation',
            message: 'Confirm toggle version',
            errors: {},
        });
    };

    const handleNotificationDismiss = (event) => {
        setNotification({
            status: '',
            title: '',
            message: '',
            errors: {},
        });
        if (event.target.id === 'confirmed') {
            props.actionPutVersion({
                id: versionId,
                isActive: !active,
            });
            setActive((prevState) => !prevState);
        }
    };

    return (
        <div>
            <Switch checked={active} onChange={handleToggleActive} color="primary" />
            <NotifierDialog
                notification={notification}
                handleNotificationDismiss={handleNotificationDismiss}
            />
        </div>
    );
};

VersionToggleActive.propTypes = {
    actionPutVersion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dataPutVersion: state.version.dataPutVersion,
        errorPutVersion: state.version.errorPutVersion,
        isLoading: state.version.isLoading,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            actionPutVersion,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(VersionToggleActive);
