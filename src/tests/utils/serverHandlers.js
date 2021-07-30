// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import mockedGetBrands from '../mocks/getBrands_mock';

const handlers = [
    rest.get('http://localhost/api', (_req, res, ctx) => {
        return res(ctx.json(mockedGetBrands));
    }),
];

export default handlers;
