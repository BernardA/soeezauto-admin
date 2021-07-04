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
import { capitalize, urlWriter } from 'tools/functions';
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

const BrandView = (props) => {
    console.log('props', props);
    const { brand } = props;
    const classes = useStyles();
    const [modelView, setModelView] = useState(null);
    useEffect(() => {
        if (brand) {
            const data = [];
            brand.models.map((model) =>
                data.push({
                    id: model.id,
                    model: model.model,
                    modelYear: model.modelYear,
                    isActive: model.isActive,
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
                    name: 'modelYear',
                },
                {
                    name: 'isActive',
                    options: {
                        customBodyRender: (value) => {
                            console.log('value', value);
                            return value ? <Check /> : <Close />;
                        },
                    },
                },
            ];
            setModelView({
                data,
                columns,
            });
        }
    }, [brand]);

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
                        href: '/brands',
                        text: 'brands',
                    },
                    {
                        href: null,
                        text: 'brand view',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href={`/brands/edit/${urlWriter(brand.brand)}`}>
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
                                <Typography variant="body2">{brand.id}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Brand</Typography>
                                <Typography variant="body2">{brand.brand}</Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Active</Typography>
                                <Typography variant="body2">
                                    {brand.isActive ? <Check /> : <Close />}
                                </Typography>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Typography component="span">Models</Typography>
                                {modelView && (
                                    <MuiThemeProvider theme={getMuiTheme()}>
                                        <MUIDataTable
                                            data={modelView.data}
                                            columns={modelView.columns}
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

BrandView.propTypes = {
    brand: PropTypes.object.isRequired,
};

export default BrandView;

const queryQl = `query getBrand(
    $brand: [String!]
) {
    brands(
         brand_list: $brand
    ) {
        id
        brand
        isActive
        image
        models(
            _order: {model: "ASC"}
        ){
            id
            model
            modelYear
            isActive
        }
    }
}`;

export async function getServerSideProps(context) {
    const { brand: brandParam } = context.params;
    let brandInput = brandParam.replace(/-/g, ' ');
    if (brandParam === 'bmw') {
        brandInput = brandParam.toUpperCase();
    } else {
        brandInput = capitalize(brandParam);
    }
    const variables = {
        brand: [brandInput],
    };
    const data = await apiQl(queryQl, variables, false);
    return {
        props: {
            brand: data.data.brands[0],
        },
    };
}
