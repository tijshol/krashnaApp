import { notifications as testValues } from '../assets/json/notifications-test.js';
import { apiData } from './keys/sheets_api.js';
import { HTTP } from '@ionic-native/http';
const TEST_MODE = false;

export class NotificationService {

	constructor(private http: HTTP) {}

	get() {
		if (TEST_MODE) {
			return testValues;
		} else {
			console.log(apiData.key, apiData.sheetId);
			// this.http.get('')
		}
	}
}