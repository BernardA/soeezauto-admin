// THIS DOES NOT WORK PROPERLY
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Brands from 'pages/brands';
// import brandsMock from '../mocks/brands_mock';

// const myService = graphql.link('http://localhost:8000/api/graphql');
const brands = [
    {
        id: '/api/brands/3',
        brand: 'Alfa Romeo',
        isActive: true,
        image: 'alfa-romeo.png',
        models: [
            {
                id: '/api/models/349',
                model: 'Giulia',
                modelYear: 2016,
            },
            {
                id: '/api/models/356',
                model: 'Giulietta',
                modelYear: 2016,
            },
            {
                id: '/api/models/444',
                model: 'Stelvio',
                modelYear: 2018,
            },
        ],
    },
];

const handlers = [
    graphql.query('getBrandsModels', (req, res, ctx) => {
        console.log('req', req.variables);
        return res(ctx.set('Content-Type', 'application/json'), ctx.data(brands));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({
        onUnhandledRequest(req) {
            console.error(
                'Found an unhandled %s request to %s',
                req.method,
                req.url.href,
            );
        },
    });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
server.printHandlers();
describe('brands page', () => {
    it('should render table with contents', async () => {
        render(<Brands brands={brands} />);
        // await waitFor(() => {
        expect(screen.getByText('Alfa Romeo')).toBeInTheDocument();
        // });
    });
    /*
    it('should render empty table', async () => {
        render(<Brands brands={[]} />);
        const main = screen.getByText('Sorry, no matching records found');
        expect(main).toBeInTheDocument();
    });
    it('should filter brand', async () => {
        render(<Brands brands={brandsMock.brands} />);
        const filter = screen.getByTitle('Filter Table');
        expect(filter).toBeInTheDocument();
    });
    */
});
