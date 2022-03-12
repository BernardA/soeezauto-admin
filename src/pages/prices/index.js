/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { apiQl } from 'lib/functions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import { showtime } from 'tools/functions';

const getMuiTheme = () =>
    createMuiTheme({
        overrides: {
            MUIDataTableHeadCell: {
                root: {
                    '&:nth-child(1)': {
                        width: '180px',
                    },
                    width: 90,
                },
            },
            MUIDataTableBodyCell: {
                root: {
                    '& div:first-child': {
                        fontSize: '.8rem',
                    },
                    '& > p': {
                        fontSize: '.8rem',
                    },
                    '& >svg': {
                        color: 'green',
                    },
                },
                cellStackedSmall: {
                    height: 48,
                },
                responsiveStackedSmall: {
                    height: 48,
                },
                stackedParent: {
                    padding: '10px 8px',
                },
            },
            MuiTypography: {
                h6: {
                    textTransform: 'capitalize',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                },
            },
        },
    });

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

const Prices = ({ prices }) => {
    const classes = useStyles();
    const [allPrices, setAllPrices] = useState(null);
    useEffect(() => {
        if (prices) {
            const data = [];
            prices.edges.map((price) =>
                data.push({
                    id: price.node.id,
                    model: price.node.version.model.model,
                    version: price.node.version.id,
                    price: price.node.price,
                    promo: price.node.promo || '-',
                    createdAt: price.node.createdAt,
                    edit: price.node._id,
                }),
            );

            const columns = [
                {
                    name: 'id',
                },
                {
                    name: 'model',
                },
                {
                    name: 'version',
                },
                {
                    name: 'price',
                },
                {
                    name: 'promo',
                },
                {
                    name: 'createdAt',
                    options: {
                        customBodyRender: (value) => {
                            return showtime(value);
                        },
                    },
                },
                {
                    name: 'edit',
                    label: ' ',
                    options: {
                        customBodyRender: (value) => {
                            return (
                                <Link href={`/prices/edit/${value}`}>
                                    <Button variant="outlined" size="small">
                                        Edit
                                    </Button>
                                </Link>
                            );
                        },
                    },
                },
            ];
            setAllPrices({
                data,
                columns,
            });
        }
    }, [prices]);

    const options = {
        sort: true,
        viewColumns: true,
        search: true,
        filter: true,
        print: false,
        download: false,
        filterType: 'dropdown',
        responsive: 'vertical',
        pagination: true,
        // rowsPerPage: trimList.uniqueIds.length,
        selectableRows: 'none',
        selectableRowsHeader: false,
    };

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        href: null,
                        text: 'prices',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href="/prices/create">
                        <Button color="inherit">Create</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                {allPrices && (
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            data={allPrices.data}
                            columns={allPrices.columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                )}
            </div>
        </>
    );
};

Prices.propTypes = {
    prices: PropTypes.object.isRequired,
};

export default Prices;

const queryQl = `query getPrices {
    prices(
        first:100000,
        after: null
        version_isActive: true
        version_model_isActive: true
        _order: {version_id: "ASC", createdAt: "DESC"}
    ){
		edges{
            node{
                id
                _id
                version {
                    id
                    model {
                        model
                    }
                }
                price
                promo
                createdAt
            }
        }
    }
}
`;

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=300',
    );
    const data = await apiQl(queryQl, null, false);
    return {
        props: {
            prices: data.data.prices,
        },
    };
}
