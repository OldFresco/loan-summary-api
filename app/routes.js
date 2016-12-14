import {Router} from 'express';
import MetaController from './controllers/meta.controller';
import LoanSummariesController from './controllers/loanSummaries.controller';
import jwt from 'express-jwt';
import settings from './config/settings';

const routes = new Router();
const version = settings.apiVersion;
const jwtCheck = jwt({
    secret: new Buffer(settings.auth0.secret, 'base64'),
    audience: settings.auth0.client,
    issuer: settings.auth0.domain 
});

routes.get(`${version}/`, MetaController.index);
routes.get(`${version}/loan-summaries`, jwtCheck, LoanSummariesController.retrieveSummaries);

export default routes;
