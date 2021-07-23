/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Card,
    CardContent,
    FormControl,
} from '@material-ui/core';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Check, Close } from '@material-ui/icons';
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

const ModelView = (props) => {
    const { model } = props;
    const classes = useStyles();
    const [versionView, setVersionView] = useState(null);
    useEffect(() => {
        if (model) {
            const data = [];
            model.versions.map((version) =>
                data.push({
                    id: version.id,
                    version: version.version,
                    isActive: version.isActive,
                    price: version.prices.edges[0].node.price,
                    promo: version.prices.edges[0].node.promo || 'n/a',
                }),
            );

            const columns = [
                {
                    name: 'id',
                },
                {
                    name: 'version',
                },
                {
                    name: 'isActive',
                    options: {
                        customBodyRender: (value) => {
                            return value ? <Check /> : <Close />;
                        },
                    },
                },
                {
                    name: 'price',
                },
                {
                    name: 'promo',
                },
            ];
            setVersionView({
                data,
                columns,
            });
        }
    }, [model]);
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
        <div>
            <Breadcrumb
                links={[
                    {
                        href: '/models',
                        text: 'models',
                    },
                    {
                        href: null,
                        text: 'model view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href={`/models/edit/${model._id}`}>
                        <Button color="inherit">Edit</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <div>
                            <FormControl>
                                <Typography component="span">Model</Typography>
                                <Typography variant="body2">{model.model}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Id</Typography>
                                <Typography variant="body2">{model.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Brand</Typography>
                                <Typography variant="body2">
                                    {model.brand.brand}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Brand id</Typography>
                                <Typography variant="body2">{model.brand.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Segment</Typography>
                                <Typography variant="body2">
                                    {model.segment.segment}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Active</Typography>
                                <Typography variant="body2">
                                    {model.isActive ? <Check /> : <Close />}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Versions</Typography>
                                {versionView && (
                                    <MuiThemeProvider theme={getMuiTheme()}>
                                        <MUIDataTable
                                            data={versionView.data}
                                            columns={versionView.columns}
                                            options={options}
                                        />
                                    </MuiThemeProvider>
                                )}
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

ModelView.propTypes = {
    model: PropTypes.object.isRequired,
};

export default ModelView;

const queryQl = `query getModel(
  	$id: ID!
) {
    model(id: $id){
        id
        _id
    	model
    	modelYear
        isActive
    	images {
            filename
        }
    	brand {
            id
            brand
        }
        segment {
            id
            segment
        }
        versions{
            id
            version
            isActive
            prices (
                first: 1
                after: null
                _order: { createdAt: "DESC"}
            ) {
                edges {
                    node {
                        id
                        price
                        promo
                        createdAt
                    }
                }
            }
        }
    }
}`;

export async function getServerSideProps(context) {
    const variables = {
        id: `/api/models/${context.params.modelId}`,
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            model: data.data.model,
        },
    };
}
