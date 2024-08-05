import { z } from "zod";

export const workspaceInvitationSchema = z.object({
    status: z
        .enum(["accept", "reject"])
        .default("accept"),
    workspace_id: z.string(),
});

export type WorkspaceInvitationSchema = typeof workspaceInvitationSchema;