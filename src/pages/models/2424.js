import React, { useEffect, useState } from 'react';
// import { Button, AppBar, Toolbar } from '@material-ui/core';
// import { Check, Close } from '@material-ui/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { apiQl } from 'lib/functions';
import getBrands from 'lib/getBrands';
import Loading from 'components/std/loading';

const queryBrand = `query getBrand(
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
            brand {
                id
                brand
            }
        }
    }
}`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledSelect = styled.select`
    background-color: red;
`;

const ItemQuantity = ({ modelId, basket }) => {
    if (basket.size > 0) {
        // const find = basket.filter((basketItem) => {
        //     return basketItem.id === modelId;
        // });
        if (basket.get(modelId)) {
            return basket.get(modelId).quantity;
        }
    }
    return 0;
};

const M2424 = ({ brands, models }) => {
    console.log('PROPS', models);

    // const [currentBrand, setCurrentBrand] = useState('all');
    const [currentModels, setCurrentModels] = useState(null);
    const [basket, setBasket] = useState(new Map());

    useEffect(() => {
        if (models) {
            setCurrentModels(models.slice(0, 20));
        }
    }, [models]);

    const handleSetBrandSelect = () => {
        const options = [
            <option key={0} aria-label="Toutes" value="all">
                Choisir
            </option>,
        ];
        brands.forEach((bra) => {
            options.push(
                <option value={bra.brand} key={bra.id}>
                    {bra.brand}
                </option>,
            );
        });

        return options;
    };

    const handleBrandSelectChange = async (event) => {
        console.log('EVENT', event.target.value);
        const value = event.target.value;
        // setCurrentBrand(value);
        if (value === 'all') {
            setCurrentModels(models.slice(0, 20));
        } else {
            const variables = {
                brand: [value],
            };
            const data = await apiQl(queryBrand, variables, false);
            setCurrentModels(data.data.brands[0].models);
            console.log('BRAND', data.data.brands[0].models);
        }
    };

    const handleSearch = (event) => {
        // TODO search whole set FROM API
        event.preventDefault();
        const term = event.target[0].value;
        console.log('EVENT.TARGEG', event.target[0].value);
        const result = currentModels.filter((obj) =>
            Object.values(obj).some((val) =>
                val ? val.toString().toLowerCase().includes(term.toLowerCase()) : false,
            ),
        );
        setCurrentModels([...result]);
        event.target.reset();
    };

    const handleChangeBasket = (event) => {
        const operation = event.target.id;
        const modelId = event.target.value;
        const model = models.filter((mod) => {
            return mod.id === modelId;
        });
        const currentBasket = new Map(basket);
        // check if modelId exists and get it if so
        const item = currentBasket.has(modelId) ? currentBasket.get(modelId) : null;
        console.log('ITEM', item);
        if (operation === 'add') {
            currentBasket.set(modelId, {
                id: modelId,
                model: model[0].model,
                brand: model[0].brand,
                modelYear: model[0].modelYear,
                quantity: item ? item.quantity + 1 : 1,
            });
        } else if (item && item.quantity > 1) {
            currentBasket.set(modelId, {
                id: modelId,
                model: model[0].model,
                brand: model[0].brand,
                modelYear: model[0].modelYear,
                quantity: item.quantity - 1,
            });
        } else if (item && item.quantity === 1) {
            // if subtraction and current value is <= 1, then delete it from basket
            currentBasket.delete(modelId);
        }
        setBasket(currentBasket);
    };
    console.log('BASKET', basket);
    console.log('BASKET ARRAY', Array.from(basket.values()));
    return (
        <>
            <StyledDiv>
                <form>
                    <StyledSelect onChange={handleBrandSelectChange}>
                        {handleSetBrandSelect()}
                    </StyledSelect>
                </form>
                <form name="searchAll" onSubmit={handleSearch}>
                    <input name="search" type="text" />
                    <button type="submit">Go</button>
                </form>
            </StyledDiv>
            {currentModels ? (
                <table>
                    <thead>
                        <tr>
                            <th>ModelId</th>
                            <th>Model</th>
                            <th>Model Year</th>
                            <th>Brand</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentModels.map((model) => (
                            <tr key={model.id}>
                                <td>{model.id}</td>
                                <td>{model.model}</td>
                                <td>{model.modelYear}</td>
                                <td>{model.brand.brand}</td>
                                <td
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <button
                                        id="sub"
                                        value={model.id}
                                        type="button"
                                        onClick={handleChangeBasket}
                                    >
                                        -
                                    </button>
                                    <ItemQuantity modelId={model.id} basket={basket} />
                                    <button
                                        id="add"
                                        value={model.id}
                                        type="button"
                                        onClick={handleChangeBasket}
                                    >
                                        +
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <Loading />
            )}
            {basket.size > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ModelId</th>
                            <th>Model</th>
                            <th>Model Year</th>
                            <th>Brand</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(basket.values()).map((model) => (
                            <tr key={model.id}>
                                <td>{model.id}</td>
                                <td>{model.model}</td>
                                <td>{model.modelYear}</td>
                                <td>{model.brand.brand}</td>
                                <td>{model.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

M2424.propTypes = {
    models: PropTypes.array.isRequired,
};

export default M2424;

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
    const brands = await getBrands();
    return {
        props: {
            models: data.data.models,
            brands: brands.data.brands,
        },
    };
}
