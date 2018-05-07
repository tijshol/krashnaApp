import { notifications as testValues } from '../assets/json/notifications-test.js';

export class NotificationService {

	constructor(testMode) {
		this.testMode = testMode;
	}

	get() {
		if (this.testMode) {
			console.log('testValues', testValues);
			return testValues;
		} else {
			console.log('no test');
		}
	}
}