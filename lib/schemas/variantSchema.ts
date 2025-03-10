import * as z from "zod";

export const variantSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  rules_min: z.string().min(1, { message: "Minimal harus diisi" }),
  rules_max: z.string().min(1, { message: "Maksimal harus diisi" }),
  options: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, { message: "tidak boleh kosong" }),
        price: z.string().min(1, { message: "Harga harus diisi" }),
      })
    )
    .min(1, "Minimal satu opsi harus ada"),
});

export const fieldsVariants: {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "array";
}[] = [
  {
    name: "name",
    label: "Nama Variant",
    placeholder: "Masukkan nama variant",
    type: "text",
  },
  {
    name: "rules_min",
    label: "Apakah Variant ini wajib dipilih pelanggan ?",
    placeholder: "Masukkan minimal",
    type: "number",
  },
  {
    name: "rules_max",
    label: "Ada batas maksimum variant yang bisa dipilih ?",
    placeholder: "Masukkan maksimal",
    type: "number",
  },
  {
    name: "options",
    label: "Opsi",
    type: "array",
  },
];

export type Variant = z.infer<typeof variantSchema>;
