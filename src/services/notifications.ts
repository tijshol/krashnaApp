import { notifications as testValues } from '../assets/json/notifications-test.js';
import { apiData } from './keys/sheets_api.js';
const TEST_MODE = false;

export class NotificationService {

	constructor(private http) {}

	getApiLink() {
		return `https://sheets.googleapis.com/v4/spreadsheets/${apiData.sheetId}/values/A1:B10?key=${apiData.key}`;
	}

	get() {
		if (TEST_MODE) {
			return testValues;
		} else {
			return this.http.get(`https://sheets.googleapis.com/v4/spreadsheets/${apiData.sheetId}/values/A1:B10?key=${apiData.key}`, {}, {})
		}
	}
}