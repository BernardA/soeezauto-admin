/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Check, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { apiQl } from 'lib/functions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';

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

const Models = ({ models }) => {
    const classes = useStyles();
    const [allModels, setAllModels] = useState(null);
    useEffect(() => {
        if (models) {
            const data = [];
            models.map((model) =>
                data.push({
                    id: model.id,
                    model: model.model,
                    brand: model.brand.brand,
                    isActive: model.isActive,
                    edit: model._id,
                    view: model._id,
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
                    name: 'brand',
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
                    name: 'edit',
                    label: ' ',
                    options: {
                        customBodyRender: (value) => {
                            return (
                                <Link href={`/models/edit/${value}`}>
                                    <Button variant="outlined" size="small">
                                        Edit
                                    </Button>
                                </Link>
                            );
                        },
                    },
                },
                {
                    name: 'view',
                    label: ' ',
                    options: {
                        customBodyRender: (value) => {
                            return (
                                <Link href={`/models/view/${value}`}>
                                    <Button variant="outlined" size="small">
                                        View
                                    </Button>
                                </Link>
                            );
                        },
                    },
                },
            ];
            setAllModels({
                data,
                columns,
            });
        }
    }, [models]);

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
                        text: 'models',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href="/models/create">
                        <Button color="inherit">Create</Button>
                    </Link>
                    <Link href="/models/2424">
                        <Button color="inherit">2424</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                {allModels && (
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            data={allModels.data}
                            columns={allModels.columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                )}
            </div>
        </>
    );
};

Models.propTypes = {
    models: PropTypes.array.isRequired,
};

export default Models;

const queryQl = `query getModels {
    models {
        id
        _id
    	model
    	modelYear
        isActive
    	images{
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
        }
    }
}
`;

export async function getServerSideProps() {
    const data = await apiQl(queryQl, null, false);
    return {
        props: {
            models: data.data.models,
        },
    };
}
