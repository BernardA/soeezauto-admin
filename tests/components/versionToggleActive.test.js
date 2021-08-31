import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import VersionToggleActive from 'components/versionToggleActive';
import reducer from '../../src/store/reducers';

const initialState = {};
const store = createStore(reducer, initialState);

describe('switcher', () => {
    it('should render', () => {
        render(
            <Provider store={store}>
                <VersionToggleActive versionId={1000} initialActive={false} />
            </Provider>,
        );
        expect(screen.getByTestId('switcher')).toBeInTheDocument();
    });
});
