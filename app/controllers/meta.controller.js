import BaseController from './base.controller';
import settings from '../config/settings';

class MetaController extends BaseController {
  index(req, res) {
		res.json({
			version : settings.version,
			health: 'ok'
		});
	}
}

export default new MetaController();
