import { Router as ExpressRouter } from 'express';
import * as Controllers from '../controllers';
import * as Middleware from '../middleware';

const Router = ExpressRouter();

Router.post('/sign-in', Controllers.signIn);

Router.post('/sign-out', Controllers.signOut);

Router.post('/sign-up', Controllers.signUp);

Router.get('/get-joke', Middleware.withAuth, Controllers.getJoke);

export default Router;
