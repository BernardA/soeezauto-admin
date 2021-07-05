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

const Versions = ({ versions }) => {
    const classes = useStyles();
    const [allVersions, setAllVersions] = useState(null);
    useEffect(() => {
        if (versions) {
            const data = [];
            versions.map((version) =>
                data.push({
                    id: version.id,
                    model: version.model.model,
                    version: version.version,
                    isActive: version.isActive,
                    edit: version._id,
                    view: version._id,
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
                                <Link href={`/versions/edit/${value}`}>
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
                                <Link href={`/versions/view/${value}`}>
                                    <Button variant="outlined" size="small">
                                        View
                                    </Button>
                                </Link>
                            );
                        },
                    },
                },
            ];
            setAllVersions({
                data,
                columns,
            });
        }
    }, [versions]);

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
                        text: 'versions',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <p />
                    <Link href="/versions/create">
                        <Button color="inherit">Create</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                {allVersions && (
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            data={allVersions.data}
                            columns={allVersions.columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                )}
            </div>
        </>
    );
};

Versions.propTypes = {
    versions: PropTypes.array.isRequired,
};

export default Versions;

const queryQl = `query getVersions {
    versions {
        id
        _id
    	version
        model {
            id
            model
        }
        isActive
    }
}
`;

export async function getServerSideProps() {
    const data = await apiQl(queryQl, null, false);
    return {
        props: {
            versions: data.data.versions,
        },
    };
}
