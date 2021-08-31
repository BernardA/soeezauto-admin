/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Check, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { apiQl } from 'lib/functions';
import Breadcrumb from 'components/std/breadcrumb';
import Link from 'components/std/link';
import { urlWriter } from 'tools/functions';

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

const Brands = ({ brands }) => {
    const [allBrands, setAllBrands] = useState(null);
    useEffect(() => {
        if (brands) {
            const data = [];
            brands.map((brand) =>
                data.push({
                    id: brand.id,
                    brand: brand.brand,
                    isActive: brand.isActive,
                    edit: brand.brand,
                    view: brand.brand,
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
                    name: 'isActive',
                    options: {
                        customBodyRender: (value) => {
                            return value ? <Check /> : <Close />;
                        },
                    },
                },
                {
                    name: 'edit',
                    label: 'edit',
                    options: {
                        customBodyRender: (value) => {
                            return (
                                <Link href={`/brands/edit/${urlWriter(value)}`}>
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
                    label: 'view',
                    options: {
                        customBodyRender: (value) => {
                            return (
                                <Link href={`/brands/view/${urlWriter(value)}`}>
                                    <Button variant="outlined" size="small">
                                        View
                                    </Button>
                                </Link>
                            );
                        },
                    },
                },
            ];
            setAllBrands({
                data,
                columns,
            });
        }
    }, [brands]);

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
                        text: 'brands',
                    },
                ]}
            />
            <div>Brands</div>
            <div>
                {allBrands && (
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            data={allBrands.data}
                            columns={allBrands.columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                )}
            </div>
        </>
    );
};

Brands.propTypes = {
    brands: PropTypes.array.isRequired,
};

export default Brands;

const queryQl = `query getBrandsModels {
    brands(
        isActive: true
        _order: {brand: "ASC"}
    ) {
        id
        brand
        isActive
        image
        models(
            isActive: true
            _order: {model: "ASC"}
        ){
            id
            model
            modelYear
        }
    }
}`;

export async function getServerSideProps() {
    const data = await apiQl(queryQl, null, false);
    return {
        props: {
            brands: data.data.brands,
        },
    };
}
