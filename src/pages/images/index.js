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

const Images = ({ images }) => {
    const classes = useStyles();
    const [allImages, setAllImages] = useState(null);
    useEffect(() => {
        if (images) {
            const data = [];
            images.map((image) =>
                data.push({
                    id: image.id,
                    model: image.model.model,
                    modelYear: image.model.modelYear,
                    isFeatured: image.isFeatured,
                    filename: image.filename,
                    edit: image._id,
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
                    name: 'isFeatured',
                    options: {
                        customBodyRender: (value) => {
                            return value ? <Check /> : <Close />;
                        },
                    },
                },
                {
                    name: 'filename',
                },
            ];
            setAllImages({
                data,
                columns,
            });
        }
    }, [images]);

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
                        text: 'images',
                    },
                ]}
            />
            <AppBar position="static" className={classes.barRoot}>
                <Toolbar variant="dense">
                    <Link href="/images/create">
                        <Button color="inherit">Create</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div>
                {allImages && (
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            data={allImages.data}
                            columns={allImages.columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                )}
            </div>
        </>
    );
};

Images.propTypes = {
    images: PropTypes.array.isRequired,
};

export default Images;

const queryQl = `query getImages{
    images{
        id
        _id
        filename
        isFeatured
    	model {
            id
            model
            modelYear
        }
    }
}
`;

export async function getServerSideProps() {
    const data = await apiQl(queryQl, null, false);
    return {
        props: {
            images: data.data.images,
        },
    };
}
