// src/routes/tasks/+page.server.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		const response = await fetch('http://localhost:5149/Task/GetAll', {
			headers: {
				'accept': 'application/json'
			}
		});

		if (!response.ok) {
			console.error('Failed to fetch tasks, status:', response.status);
			throw error(response.status, 'Failed to fetch tasks');
		}

		const tasks = await response.json();
		return { tasks };

	} catch (err) {
		console.error('Error fetching tasks:', err);
		throw error(500, 'Internal Server Error');
	}
}