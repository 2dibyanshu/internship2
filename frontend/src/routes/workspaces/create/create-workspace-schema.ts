import { z } from "zod";
 
export const createWorkspaceSchema = z.object({
  name: z.string(),
  description: z.string(),
});
 
export type CreateWorkspaceSchema = typeof createWorkspaceSchema;