import { getOptions } from './collection';
import { URL_BASE } from './constant';
import axios from 'axios';
export const makeRequest = (method, data = null) => {
	const url = URL_BASE + method;
	const options = getOptions(url, data);
	console.log(options);
	// Make a request for a user with a given ID
	return new Promise((resolve, reject) => {
		axios(options)
			.then(function (response) {
				resolve(response);
			})
			.catch(function (error) {
				console.log(error);
				reject(error);
			});
	})
}