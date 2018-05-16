import { notifications as testValues } from '../assets/json/notifications-test.js';
import { apiData } from './keys/sheets_api.js';
const TEST_MODE = false;

export class NotificationService {

	constructor(private http) {}

	get() {
		if (TEST_MODE) {
			return testValues;
		} else {
			this.http.get("https://sheets.googleapis.com/v4/spreadsheets/${apiData.sheetId}/values/A1:B10?key=${apiData.key}", {}, {})
			.then(data => {

				return data;
				// console.log(data);
			 //    console.log(data.status);
			 //    console.log(data.data); // data received by server
			 //    console.log(data.headers);

			  })
			  .catch(error => {

			  	return error;
			 //  	console.log(error);
				// console.log(error.status);
				// console.log(error.error); // error message as string
				// console.log(error.headers);

			});
		}
	}
}