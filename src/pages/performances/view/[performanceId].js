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

const PerformanceView = (props) => {
    const { performance } = props;
    const classes = useStyles();

    return (
        <div>
            <Breadcrumb
                links={[
                    {
                        href: '/performances',
                        text: 'performances',
                    },
                    {
                        href: null,
                        text: 'performance view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href={`/performances/edit/${performance._id}`}>
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
                                <Typography variant="body2">{performance.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">To 100</Typography>
                                <Typography variant="body2">
                                    {performance.to100}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Max speed</Typography>
                                <Typography variant="body2">
                                    {performance.maxSpeed}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Emissions</Typography>
                                <Typography variant="body2">
                                    {performance.emissions}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Mileage city</Typography>
                                <Typography variant="body2">
                                    {performance.mileageCity || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Mileage road</Typography>
                                <Typography variant="body2">
                                    {performance.mileageRoad || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Mileage mix</Typography>
                                <Typography variant="body2">
                                    {performance.mileageMix}
                                </Typography>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

PerformanceView.propTypes = {
    performance: PropTypes.object.isRequired,
};

export default PerformanceView;

const queryQl = `query getPerformance(
    $id: ID!
){
    performance(id: $id){
        _id
        id
        to100
        maxSpeed
        emissions
        mileageCity
        mileageRoad
        mileageMix
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/performances/${context.params.performanceId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            performance: data.data.performance,
        },
    };
}
