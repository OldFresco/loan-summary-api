import BaseController from './base.controller';
import settings from '../config/settings';
import axios from 'axios';

class LoanSummariesController extends BaseController {
    constructor() {
        super();
        this.retrieveSummaries = this
            .retrieveSummaries
            .bind(this);
    }

    retrieveSummaries(req, res) {
        let httpClient = axios.create({
            baseURL: settings.loanManagementApi.BaseUrl,
            timeout: 1000,
            headers: {
                'X-Custom-Header': 'foobar'
            }
        });

        let getUserAccount = () => {
            return httpClient.get('/applicaitons/12345');
        }

        let getPaymentSchedules = () => {
            return httpClient.get('/applications/12345/schedules');
        }

        httpClient.all([getUserAccount(), getPaymentSchedules()]).then(httpClient.spread((user, paymentSchedule) => {
            res.json({foo: user, bar: paymentSchedule});
        }));

    }
}

export default new LoanSummariesController();