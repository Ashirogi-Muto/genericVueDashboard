export const getOptions = (url, data) => {
	let options = {
		method: 'GET',
		url: url,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	if (data) {
		options['method'] = 'POST';
		options['data'] = data;
	}

	return options;
}