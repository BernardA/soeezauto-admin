import { apiQl } from './functions';

const queryQl = `query getModels(
  	$isActive: Boolean!
) {
    models(
        isActive: $isActive
        _order: {model: "ASC"}
    ) {
        id
    	model
    	modelYear
    }
}
`;

const variables = {
    isActive: true,
};

export default async function getModels() {
    const models = await apiQl(queryQl, variables);
    return models;
}
