// THIS DOES NOT WORK PROPERLY
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Versions from 'pages/versions';
import reducer from '../../src/store/reducers';

const initialState = {};
const store = createStore(reducer, initialState);

const versions = [
    {
        id: '/api/versions/1',
        _id: 1,
        version: 'Sandero 1.2L 75ch',
        model: {
            id: '/api/models/1',
            model: 'Sandero 2016',
        },
        isActive: false,
    },
];

const handlers = [
    graphql.query('getVersions', (req, res, ctx) => {
        console.log('req', req.variables);
        return res(ctx.set('Content-Type', 'application/json'), ctx.data(versions));
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

describe('brands page', () => {
    it('should render table with contents', async () => {
        render(
            <Provider store={store}>
                <Versions versions={versions} />
            </Provider>,
        );
        expect(screen.getByText('Sandero 2016')).toBeInTheDocument();
    });
    it('should show dialog when toggleActive clicked', async () => {
        render(
            <Provider store={store}>
                <Versions versions={versions} />
            </Provider>,
        );
        const switcher = screen.getByTestId('switcher');
        // fireEvent.change(switcher, 'valueChange', true || false);
        // Simulate.change(switcher);
        userEvent.click(switcher);
        await waitFor(() => {
            expect(screen.getByTestId('notification')).toBeInTheDocument();
        });
    });
});
