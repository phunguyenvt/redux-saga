export async function createTopic() {
	let failedApi = 'https://reqres.in/api/register';
	let successApi = 'https://reqres.in/api/users?delay=3';
	const response = await fetch(successApi, {
		method: 'POST'
	});
	return response.json();
}

export async function getCategory() {
	let data = [
		{"id": 1, "name": "1st menu item"},
		{"id": 2, "name": "2nd menu item"},
		{"id": 3, "name": "3rd menu item"},
	];

	return data;
}
