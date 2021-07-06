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

const TrimView = (props) => {
    const { trim } = props;
    const classes = useStyles();

    return (
        <div>
            <Breadcrumb
                links={[
                    {
                        href: '/trims',
                        text: 'trims',
                    },
                    {
                        href: null,
                        text: 'trim view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href={`/trims/edit/${trim._id}`}>
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
                                <Typography variant="body2">{trim.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Trim</Typography>
                                <Typography variant="body2">{trim.trim}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Trim type</Typography>
                                <Typography variant="body2">{trim.trimType}</Typography>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

TrimView.propTypes = {
    trim: PropTypes.object.isRequired,
};

export default TrimView;

const queryQl = `query getTrim(
    $id: ID!
){
    trim(id: $id){
        _id
        id
        trim
        trimType
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/trims/${context.params.trimId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            trim: data.data.trim,
        },
    };
}
