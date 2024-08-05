import { lucia } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";
import Iron from '@hapi/iron';
import { AUTH_PASSWORD } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
	const sealed = event.cookies.get(lucia.sessionCookieName);
	if (!sealed) {
		event.locals.user = null;
		return resolve(event);
	}
	const unsealed = await Iron.unseal(sealed, AUTH_PASSWORD, Iron.defaults);
	event.locals.user = unsealed as {
		id: string,
		email: string,
		first_name: string,
		last_name: string,
		session_id: string,
		expires_at: Date
	};
	return resolve(event);
};