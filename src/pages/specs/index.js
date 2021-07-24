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

const Specs = ({ specs }) => {
    const classes = useStyles();
    const [allSpecs, setAllSpecs] = useState(null);
    useEffect(() => {
        if (specs) {
            const data = [];
            specs.map((spec) =>
                data.push({
                    id: spec.id,
                    model: spec.model.model,
                    modelYear: spec.model.modelYear,
                    filename: spec.filename,
                    updatedAt: spec.updatedAt,
                    edit: spec._id,
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
                    name: 'filename',
                },
                {
                    name: 'updatedAt',
                    options: {
                        customBodyRender: (value) => {
                            return showtime(value);
                        },
                    },
                },
            ];
            setAllSpecs({
                data,
                columns,
            });
        }
    }, [specs]);

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
                        text: 'specs',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href="/specs/create">
                        <Button color="inherit">Create</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                {allSpecs && (
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            data={allSpecs.data}
                            columns={allSpecs.columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                )}
            </div>
        </>
    );
};

Specs.propTypes = {
    specs: PropTypes.array.isRequired,
};

export default Specs;

const queryQl = `query getSpecs{
    specs{
        id
        _id
        filename
    	model {
            id
            model
            modelYear
        }
        updatedAt
    }
}
`;

export async function getServerSideProps() {
    const data = await apiQl(queryQl, null, false);
    return {
        props: {
            specs: data.data.specs,
        },
    };
}
