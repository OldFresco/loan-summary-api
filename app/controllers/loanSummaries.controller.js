import {
    createFetch,
    base,
    accept,
    parse,
    header,
    method
} from 'http-client';
import BaseController from './base.controller';
import settings from '../config/settings';
import hmac from '../http/hmac';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class LoanSummariesController extends BaseController {
    constructor() {
        super();
        this.retrieveSummaries = this
            .retrieveSummaries
            .bind(this);
    }

    retrieveSummaries(req, res) {
        let endpoint = '/applications/1700000001';
        
        let httpRequest = {
            url: settings.loanManagementApi.baseUrl + endpoint,
            method: 'GET'
        };

        let headers = hmac(httpRequest);

        const fetch = createFetch(
            base(settings.loanManagementApi.baseUrl), 
            accept('application/json'), 
            parse('json'), 
            header('Date', headers.date), 
            header('Authorization', headers.HMACHash), 
            method(httpRequest.method));

        fetch(endpoint).then(response => {
            res.json({account: response});
        });

    }
}

export default new LoanSummariesController();