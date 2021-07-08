import { apiQl } from './functions';

const queryQl = `query getTrims{
        trims(
          _order: {trim: "ASC"}
        ){
    		id
    		_id
            trim
    		trimType
        }
    }
`;

export default async function getTrims() {
    const trims = await apiQl(queryQl, null);
    return trims;
}
