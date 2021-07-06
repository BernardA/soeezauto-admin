import { apiQl } from './functions';

const queryQl = `query getTaxes {
    taxes{
        id
        CF
    }
}
`;

export default async function getTaxes() {
    const taxes = await apiQl(queryQl, null);
    return taxes;
}
