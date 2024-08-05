import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user?.session_id) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.user.session_id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
	}
};