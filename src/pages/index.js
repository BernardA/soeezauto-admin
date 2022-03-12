import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { apiQl } from 'lib/functions';

const Admin = ({ modelsNoImage, modelsNoSpec, versionsNoTrims, versionsNoPrices }) => {
    return (
        <main>
            <h2>Models with no images</h2>
            {modelsNoImage.length > 0 ? (
                <List>
                    {modelsNoImage.map((model) => (
                        <ListItem key={model.id}>{model.model}</ListItem>
                    ))}
                </List>
            ) : (
                <p>All active models have images</p>
            )}
            <h2>Models with no specs for this month</h2>
            {modelsNoSpec.length > 0 ? (
                <List>
                    {modelsNoSpec.map((model) => (
                        <ListItem
                            key={model.id}
                        >{`${model.brand.brand} ${model.model}`}</ListItem>
                    ))}
                </List>
            ) : (
                <p>All active models have specs</p>
            )}
            <h2>Versions with no trims</h2>
            {versionsNoTrims.length > 0 ? (
                <List>
                    {versionsNoTrims.map((version) => (
                        <ListItem
                            key={version.id}
                        >{`${version.model.model} ${version.version}`}</ListItem>
                    ))}
                </List>
            ) : (
                <p>All active versions have trims</p>
            )}
            <h2>Versions with no prices</h2>
            {versionsNoPrices.length > 0 ? (
                <List>
                    {versionsNoPrices.map((version) => (
                        <ListItem
                            key={version.id}
                        >{`${version.model.model} ${version.version}`}</ListItem>
                    ))}
                </List>
            ) : (
                <p>All active versions have price</p>
            )}
        </main>
    );
};

export default Admin;

const queryModelsNoImage = `query getModelsWithNoImages {
    models(
        isActive: true
        _order: {model: "ASC"}
        exists: {images: false}
    ) {
        id
    	model
    	modelYear
    	images {
            filename
        }

    }
}`;

const queryModelsNoSpec = `query getModelsWithNoSpecs(
  	$brandsWithSpecs: [String]
    $after: String
    ) {
        models(
            isActive: true
            _order: {brand_brand: "ASC", model: "ASC"}
            brand_brand_list: $brandsWithSpecs
        ) {
            id
    	    model
    	    modelYear
    	    brand {
                brand
            }
            specs(updatedAt: {after: $after}) {
                edges {
                    node {
                        id
                        updatedAt
                    }
                }
            }
        }
    }`;

const queryVersionsNoTrims = `query getVersionsWithoutTrims {
    versions(
        isActive: true
      exists: {trims: false}
    ) {
        id
    	version
    	model{
        model
        modelYear
      }
			trims {
        id
        
      }

    }
}`;

const queryVersionsNoPrices = `query getVersionsWithoutPrices {
    versions(
        isActive: true
        exists: {prices: false}
    ) {
        id
    	version
        model {
            id
            model
        }
		prices {
            edges {
                node {
                    id
                    price
                }
            }
        } 
    }
}`;

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=300',
    );
    const dataNoImage = await apiQl(queryModelsNoImage, null, false);
    const modelsNoImage = dataNoImage.data.models;
    const date = new Date();
    const month = date.getMonth() + 1;
    const after = `${date.getFullYear(date)}-${month.toString().padStart(2, '0')}-01`;
    const variables = {
        after,
        brandsWithSpecs: [
            'Alfa Romeo',
            'Audi',
            'BMW',
            'Citroen',
            'Dacia',
            'DS',
            'Fiat',
            'Ford',
            'Hyundai',
            'Jeep',
            'Kia',
            'Mercedes',
            'Mini',
            'Mitsubishi',
            'Nissan',
            'Opel',
            'Peugeot',
            'Renault',
            'Seat',
            'Skoda',
            'Ssangyong',
            'Suzuki',
            'Toyota',
            'Volkswagen',
        ],
    };
    const dataNoSpec = await apiQl(queryModelsNoSpec, variables, false);
    const modelsNoSpecData = dataNoSpec.data.models;
    const modelsNoSpec = modelsNoSpecData.filter((model) => {
        return model.specs.edges.length === 0;
    });
    const dataVersionNoTrims = await apiQl(queryVersionsNoTrims, null, false);
    const versionsNoTrims = dataVersionNoTrims.data.versions;
    const dataVersionNoPrices = await apiQl(queryVersionsNoPrices, null, false);
    const versionsNoPrices = dataVersionNoPrices.data.versions;
    return {
        props: {
            modelsNoImage,
            modelsNoSpec,
            versionsNoTrims,
            versionsNoPrices,
        },
    };
}
