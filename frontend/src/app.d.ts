// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: string,
				email: string,
				first_name: string,
				last_name: string,
				session_id: string,
				expires_at: Date
			} | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
