import { notifications as testResponse } from '../assets/json/notifications-test.js';
import { apiData } from './keys/sheets_api.js';
const TEST_MODE = false;

export class NotificationService {

	constructor(private http) {}

	getApiLink() {
		return `https://sheets.googleapis.com/v4/spreadsheets/${apiData.sheetId}/values/live!A:C?key=${apiData.key}`;
	}

	get() {
		if (TEST_MODE) {
			return new Promise((resolve, reject) => { setTimeout(resolve(testResponse), 2000); });
		} else {
			return this.http.get(this.getApiLink(), {}, {})
		}
	}
}