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

const MeasureView = (props) => {
    const { measure } = props;
    const classes = useStyles();

    return (
        <div>
            <Breadcrumb
                links={[
                    {
                        href: '/measures',
                        text: 'measures',
                    },
                    {
                        href: null,
                        text: 'measure view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href={`/measures/edit/${measure._id}`}>
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
                                <Typography variant="body2">{measure.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Fuel tank</Typography>
                                <Typography variant="body2">
                                    {measure.fuelTank || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Width</Typography>
                                <Typography variant="body2">{measure.width}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Height</Typography>
                                <Typography variant="body2">{measure.height}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Length</Typography>
                                <Typography variant="body2">{measure.length}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Wheelbase</Typography>
                                <Typography variant="body2">
                                    {measure.wheelbase}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Trunk</Typography>
                                <Typography variant="body2">{measure.trunk}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Trunk max</Typography>
                                <Typography variant="body2">
                                    {measure.trunkMax || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

MeasureView.propTypes = {
    measure: PropTypes.object.isRequired,
};

export default MeasureView;

const queryQl = `query getMeasure(
    $id: ID!
){
    measure(id: $id){
        _id
        id
        fuelTank
        width
        height
        length
        wheelbase
        trunk
        trunkMax
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/measures/${context.params.measureId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            measure: data.data.measure,
        },
    };
}
