import * as z from "zod";

export const formSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
});

export const fieldsCategories: {
  name: "id" | "name";
  label: string;
  placeholder?: string;
}[] = [
  {
    name: "name",
    label: "Nama Kategori",
    placeholder: "Masukkan nama kategori",
  },
];

export type Categories = z.infer<typeof formSchema>;
