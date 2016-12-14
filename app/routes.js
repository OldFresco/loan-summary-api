import { Router } from 'express';
import MetaController from './controllers/meta.controller';
import LoanSummariesController from './controllers/loanSummaries.controller';

import authenticate from './middleware/authenticate';
import settings from './config/settings';

const routes = new Router();
const version = settings.apiVersion;

routes.get(`${version}/`, MetaController.index);
routes.get(`${version}/loan-summaries`, authenticate, LoanSummariesController.retrieveSummaries);

export default routes;
