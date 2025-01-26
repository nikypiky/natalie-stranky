export default function HandlePost(destination, data, event) {
	if (event) {
		event.preventDefault();
	}
	fetch(destination, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			console.log("Response statuss:", response.status);
			if (!response.ok) {
				throw new Error(response.status);
			}
		})
		.catch(error => {
			console.log("Errors:", String(error.message));
		});
}
