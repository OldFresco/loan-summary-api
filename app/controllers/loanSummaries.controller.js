import BaseController from './base.controller';
import LoanSummary from '../models/LoanSummary';
import axios from 'axios';

class LoanSummariesController extends BaseController {
    constructor() {
        super();
        this.retrieveSummaries = this.retrieveSummaries.bind(this);
    }

    retrieveSummaries(req, res) {
        var httpClient = axios.create({
            baseURL: 'https://some-domain.com/api/',
            timeout: 1000,
            headers: { 'X-Custom-Header': 'foobar' }
        })

        getUserAccount = () => {
            return httpClient.get('/user/12345');
        }

        getPaymentSchedules = () => {
            return httpClient.get('/user/12345/schedules');
        }

        httpClient.all([getUserAccount(), getPaymentSchedules()])
            .then(httpClient.spread((user, paymentSchedule) => {
                // Both requests are now complete 
            }));
    }
}

export default new LoanSummariesController();