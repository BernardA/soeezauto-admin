import { apiQl } from './functions';

const queryQl = `query getBrandsModels(
    $isActive: Boolean!,
    $isActiveModel: Boolean!
    ) {
    brands(
        isActive: $isActive
        _order: {brand: "ASC"}
        ) {
		    id
		    brand
            models(
                isActive: $isActiveModel
                _order: {model: "ASC"}
            ){
                id
                model
                modelYear
                versions(
                    isActive: true
                    _order: {version: "ASC"}
                ) {
                    id
                    version
                }
            }
        }
    }`;

const variables = {
    isActive: true,
    isActiveModel: true,
};

export default async function getBrandsModels() {
    const brandsModels = await apiQl(queryQl, variables);
    return brandsModels;
}
