// import { screen } from '@testing-library/react';
// import { getPage } from 'next-page-tester';

// let getByTestId;
// let submitButton;
/*
beforeEach(async () => {
    const { render } = await getPage({
        route: '/data',
    });
    render();
    submitButton = await screen.getByText('Submit');
});

test('submit button exists', () => {
    expect(submitButton).toBeInTheDocument();
});
*/
/*
describe('Data page', () => {
    it('renders data page', async () => {
        const { render } = await getPage({
            route: '/data',
        });

        render();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });
});
*/
// https://dev.to/maciekgrzybek/testing-next-js-pages-1jai
import { screen, waitFor } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import mockedGetBrands from 'tests/mocks/getBrands_mock';
import { server, rest } from 'tests/utils/server';

test('displays homepage', async () => {
    const { render } = await getPage({ route: '/data' });

    render();

    await waitFor(() => {
        mockedGetBrands.results.forEach((brand) => {
            expect(screen.getByText('Submit')).toBeInTheDocument();
        });
    });
});
