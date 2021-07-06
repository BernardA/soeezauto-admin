/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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

const Motors = ({ motors }) => {
    const classes = useStyles();
    const [allMotors, setAllMotors] = useState(null);
    useEffect(() => {
        if (motors) {
            const data = [];
            motors.map((motor) =>
                data.push({
                    id: motor.id,
                    brand: motor.brand.brand,
                    name: motor.name,
                    fuel: motor.fuel,
                    cylinder: motor.cylinder || '-',
                    cc: motor.cc || '-',
                    power: motor.power,
                    torque: motor.torque,
                    valves: motor.valves || '-',
                    aspiration: motor.aspiration || '-',
                    edit: motor._id,
                }),
            );

            const columns = [
                {
                    name: 'id',
                },
                {
                    name: 'brand',
                },
                {
                    name: 'name',
                },
                {
                    name: 'fuel',
                },
                {
                    name: 'cylinder',
                },
                {
                    name: 'cc',
                },
                {
                    name: 'power',
                },
                {
                    name: 'torque',
                },
                {
                    name: 'valves',
                },
                {
                    name: 'aspiration',
                },
                {
                    name: 'edit',
                    label: ' ',
                    options: {
                        customBodyRender: (value) => {
                            return (
                                <Link href={`/motors/edit/${value}`}>
                                    <Button variant="outlined" size="small">
                                        Edit
                                    </Button>
                                </Link>
                            );
                        },
                    },
                },
            ];
            setAllMotors({
                data,
                columns,
            });
        }
    }, [motors]);

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
                        text: 'motors',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href="/motors/create">
                        <Button color="inherit">Create</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                {allMotors && (
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            data={allMotors.data}
                            columns={allMotors.columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                )}
            </div>
        </>
    );
};

Motors.propTypes = {
    motors: PropTypes.array.isRequired,
};

export default Motors;

const queryQl = `query getMotors{
    motors{
        _id
        id
        brand{
            id
            brand
        }
        name
        fuel
        cylinder
        cc
        power
        torque
        valves
        aspiration
    }
}
`;

export async function getServerSideProps() {
    const data = await apiQl(queryQl, null, false);
    return {
        props: {
            motors: data.data.motors,
        },
    };
}
