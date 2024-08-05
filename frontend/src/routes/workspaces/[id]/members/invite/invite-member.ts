import { z } from "zod";
 
export const roles = {
	admin: "Admin",
	guest: "Guest",
	user: "User",
} as const;
 
type Role = keyof typeof roles;
 
export const schema = z.object({
});

export const inviteMemberSchema = z.object({
  email: z.string().email(),
	role: z
		.enum(Object.keys(roles) as [Role, ...Role[]])
		.default("guest"),
});
 
export type InviteMemberSchema = typeof inviteMemberSchema;