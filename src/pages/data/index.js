import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import getBrands from 'lib/getBrands';
import NotifierDialog from 'components/std/notifierDialog';
import Loading from 'components/std/loading';

const useStyles = makeStyles({
    root: {
        contentVisibility: 'auto',
        containIntrinsicSize: '175px',
        backgroundColor: '#ffe082',
        color: '#29335c',
        margin: '20px auto',
        width: 'clamp(300px,100%, 600px)',
        '& .MuiCardHeader-root': {
            textAlign: 'center',
            // color: '#fff',
        },
        '& .MuiCardHeader-avatar': {
            padding: 6,
            backgroundColor: '#fff',
            borderRadius: 10,
        },
        '& .MuiCardContent-root': {
            // height: '200px',
        },
        '& .MuiCardActions-root': {
            justifyContent: 'center',
        },
        '& .MuiCardHeader-content span': {
            textTransform: 'uppercase',
            fontWeight: 'bold',
        },
    },
    cardContent: {
        backgroundColor: '#fff',
        margin: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, auto))',
        gap: 20,
        justifyContent: 'center',
        '& form div': {
            width: '100%',
        },
    },
    selectBrand: {
        height: 80,
        width: 300,
        margin: '0 auto',
    },
});

const Data = ({ brands }) => {
    const router = useRouter();
    const classes = useStyles();
    const [brandId, setBrandId] = useState('all');
    const [action, setAction] = useState('all');
    const [baseDate, setBaseDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        status: '',
        title: '',
        message: '',
        errors: {},
    });

    const handleSetBrandSelect = () => {
        const options = [
            <MenuItem key={0} aria-label="Toutes" value="all">
                Choisir
            </MenuItem>,
        ];
        brands.forEach((bra) => {
            options.push(
                <MenuItem value={bra.id} key={bra.id}>
                    {bra.brand}
                </MenuItem>,
            );
        });

        return options;
    };

    const handleSetActionSelect = () => {
        const options = [
            <MenuItem key={0} aria-label="All" value="all">
                Select
            </MenuItem>,
        ];
        ['wandaloo', 'brand', 'compare'].forEach((act) => {
            options.push(
                <MenuItem value={act} key={act}>
                    {act}
                </MenuItem>,
            );
        });

        return options;
    };

    const handleBaseDateChange = () => {
        setBaseDate(event.target.value);
    };

    const handleCurrentDateChange = () => {
        setCurrentDate(event.target.value);
    };

    const handleBrandSelectChange = (event) => {
        setBrandId(event.target.value);
    };

    const handleActionSelectChange = (event) => {
        setAction(event.target.value);
    };

    const handleFormSubmit = () => {
        event.preventDefault();
        const brand = brands.filter((bra) => {
            return bra.id === brandId;
        });
        const brandName = brand[0].brand.toLowerCase().replace(' ', '-');
        if (action === 'compare') {
            router.push({
                pathname: '/data/compare',
                query: { brandName, baseDate, currentDate },
            });
            return null;
        }
        axios.interceptors.request.use(
            (config) => {
                setIsLoading(true);
                return config;
            },
            (error) => {
                setIsLoading(false);
                return Promise.reject(error);
            },
        );
        axios.interceptors.response.use(
            (response) => {
                setIsLoading(false);
                return response;
            },
            (error) => {
                setIsLoading(false);
                return Promise.reject(error);
            },
        );

        axios({
            method: 'post',
            url: `http://localhost/data/${action}`,
            data: {
                baseDir: baseDate,
                currDir: currentDate,
                brand: brandName,
            },
        }).then((response) => {
            if (response.status !== 200 || response.data.result !== 'ok') {
                setNotification({
                    status: 'ok_and_dismiss',
                    title: 'Error',
                    message: 'There was an error',
                    errors: [{ message: response.data.result }],
                });
            } else {
                setNotification({
                    status: 'ok_and_dismiss',
                    title: 'Success',
                    message: 'OK',
                    errors: {},
                });
            }
        });
        return null;
    };

    const handleNotificationDismiss = () => {
        setNotification({
            status: '',
            title: '',
            message: '',
            errors: {},
        });
    };

    return (
        <>
            {isLoading && <Loading />}
            <Card className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            name="baseDate"
                            id="base-date"
                            label="Base date"
                            onChange={handleBaseDateChange}
                        />
                        <TextField
                            name="currentDate"
                            id="current-date"
                            label="Current date"
                            onChange={handleCurrentDateChange}
                        />
                        <FormControl variant="outlined">
                            <InputLabel id="brand-select-label">
                                Choisir marque
                            </InputLabel>
                            <Select
                                labelId="brand-select-label"
                                id="brand-select"
                                name="brand"
                                label="Select brand"
                                value={brandId}
                                onChange={handleBrandSelectChange}
                                variant="outlined"
                            >
                                {handleSetBrandSelect()}
                            </Select>
                            <span id="no_cat_search" className="form_error" />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel id="action-select-label">
                                Select action
                            </InputLabel>
                            <Select
                                labelId="action-select-label"
                                id="action-select"
                                name="action"
                                label="Select action"
                                value={action}
                                onChange={handleActionSelectChange}
                                variant="outlined"
                            >
                                {handleSetActionSelect()}
                            </Select>
                            <span id="no_cat_search" className="form_error" />
                        </FormControl>
                        <Button type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
            <NotifierDialog
                notification={notification}
                handleNotificationDismiss={handleNotificationDismiss}
            />
        </>
    );
};

export default Data;

export async function getServerSideProps() {
    const brands = await getBrands();
    return {
        props: {
            brands: brands.data.brands,
        },
    };
}
