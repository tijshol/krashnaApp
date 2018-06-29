import { apiData } from './keys/sheets_api.js';

export class NotificationService {

	constructor(private http) {}

	getApiLink() {
		return `https://sheets.googleapis.com/v4/spreadsheets/${apiData.sheetId}/values/live!A:C?key=${apiData.key}`;
	}

	get() {
		return this.http.get(this.getApiLink());
	}
}