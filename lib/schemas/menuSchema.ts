import * as z from "zod";

export const formSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter" }),
  category: z.string().min(1, { message: "Kategori harus dipilih" }),
  price: z.string().min(1, { message: "Harga harus diisi" }),
});

export type Menu = z.infer<typeof formSchema>;
