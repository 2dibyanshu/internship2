import { z } from "zod";
 
export const importCSVSchema = z.object({
	name: z.string(),
  	file: z
	  .instanceof(File, { message: 'Please upload a CSV file.'})
	//   .refine((f) => f.size < 100_000, 'Max 100 kB upload size.')
});
 
export type ImportCSVSchema = typeof importCSVSchema;