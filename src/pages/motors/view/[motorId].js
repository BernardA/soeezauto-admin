/* eslint-disable react/display-name */
import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Card,
    CardContent,
    FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { apiQl } from 'lib/functions';
import Link from 'components/std/link';
import Breadcrumb from 'components/std/breadcrumb';

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
    cardContent: {
        '& div': {
            marginBottom: 15,
        },
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

const MotorView = (props) => {
    const { motor } = props;
    const classes = useStyles();

    return (
        <div>
            <Breadcrumb
                links={[
                    {
                        href: '/motors',
                        text: 'motors',
                    },
                    {
                        href: null,
                        text: 'motor view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href={`/motors/edit/${motor._id}`}>
                        <Button color="inherit">Edit</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <div>
                            <FormControl>
                                <Typography component="span">Id</Typography>
                                <Typography variant="body2">{motor.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Brand</Typography>
                                <Typography variant="body2">
                                    {motor.brand.brand}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Name</Typography>
                                <Typography variant="body2">{motor.name}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Fuel</Typography>
                                <Typography variant="body2">{motor.fuel}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Cylinder</Typography>
                                <Typography variant="body2">
                                    {motor.cylinder || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">CC</Typography>
                                <Typography variant="body2">{motor.cc || '-'}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Power</Typography>
                                <Typography variant="body2">{motor.power}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Torque</Typography>
                                <Typography variant="body2">{motor.torque}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Valves</Typography>
                                <Typography variant="body2">
                                    {motor.valves || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Aspiration</Typography>
                                <Typography variant="body2">
                                    {motor.aspiration || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

MotorView.propTypes = {
    motor: PropTypes.object.isRequired,
};

export default MotorView;

const queryQl = `query getMotor(
    $id: ID!
){
    motor(id: $id){
        _id
        id
        brand{
            id
            brand
        }
        name
        fuel
        cylinder
        cc
        power
        torque
        valves
        aspiration
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/motors/${context.params.motorId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            motor: data.data.motor,
        },
    };
}
