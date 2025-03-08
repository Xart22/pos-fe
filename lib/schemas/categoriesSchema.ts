import * as z from "zod";

export const formSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
});

export type Categories = z.infer<typeof formSchema>;
