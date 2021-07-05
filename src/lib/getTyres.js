import { apiQl } from './functions';

const queryQl = `query getTyres {
    tyres(
        _order: {tyre: "ASC"}
    ) {
        id
        tyre
    }
}
`;

export default async function getTyres() {
    const tyres = await apiQl(queryQl, null);
    return tyres;
}
