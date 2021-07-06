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
import { showtime } from 'tools/functions';

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

const PriceView = (props) => {
    const { price } = props;
    const classes = useStyles();

    return (
        <div>
            <Breadcrumb
                links={[
                    {
                        href: '/prices',
                        text: 'prices',
                    },
                    {
                        href: null,
                        text: 'price view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href={`/prices/edit/${price._id}`}>
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
                                <Typography variant="body2">{price.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Brand</Typography>
                                <Typography variant="body2">
                                    {price.version.model.brand.brand}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Model</Typography>
                                <Typography variant="body2">
                                    {price.version.model.model}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Version id</Typography>
                                <Typography variant="body2">
                                    {price.version.id}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Version</Typography>
                                <Typography variant="body2">
                                    {price.version.version}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Price</Typography>
                                <Typography variant="body2">{price.price}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Promo</Typography>
                                <Typography variant="body2">
                                    {price.promo || '-'}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Updated</Typography>
                                <Typography variant="body2">
                                    {showtime(price.updatedAt)}
                                </Typography>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

PriceView.propTypes = {
    price: PropTypes.object.isRequired,
};

export default PriceView;

const queryQl = `query getPrice(
    $id: ID!
){
    price(id: $id){
        _id
        id
        version {
            id
            version
            model {
                id
                model
                brand {
                    id
                    brand
                }
            }
        }
        price
        promo
        updatedAt
    }
}
`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/prices/${context.params.priceId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            price: data.data.price,
        },
    };
}
