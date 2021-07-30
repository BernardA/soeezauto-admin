import { rest } from 'msw';
import { setupServer } from 'msw/node';
import handlers from './serverHandlers';

const server = setupServer(handlers[0]);
export { server, rest };
