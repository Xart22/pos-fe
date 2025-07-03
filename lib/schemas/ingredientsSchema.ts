import * as z from "zod";

export const formSchema = z.object({
  id: z.number().int().optional(),
  kode: z.string().min(1, { message: "Kode harus diisi" }),
  // Kode
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  harga: z
    .string({ invalid_type_error: "Harga harus berupa angka" })
    .min(2, { message: "Harga harus lebih dari 0" }),
  stock: z
    .string()
    .min(2, { message: "Stok harus berupa angka dan minimal 0" }),
  satuan: z.string().min(1, { message: "Satuan harus dipilih" }),
  description: z.string().optional(),
});
export type Option = { label: string; value: string };
export const fieldsIngredients: {
  name: "id" | "name" | "harga" | "stock" | "satuan" | "description" | "kode";
  label: string;
  placeholder?: string;
  type?:
    | "text"
    | "number"
    | "array"
    | "select"
    | "textarea"
    | "file"
    | "checkbox";
  options?: Option[];
}[] = [
  {
    name: "kode",
    label: "Kode Bahan",
    placeholder: "Masukkan kode bahan",
    type: "text",
  },
  {
    name: "name",
    label: "Nama Bahan",
    placeholder: "Masukkan nama bahan",
    type: "text",
  },
  {
    name: "harga",
    label: "Harga",
    placeholder: "Masukkan harga bahan",
    type: "number",
  },
  {
    name: "stock",
    label: "Stok",
    placeholder: "Masukkan stok bahan",
    type: "number",
  },

  {
    name: "satuan",
    label: "Satuan",
    placeholder: "Pilih satuan",
    type: "select",
    options: [
      { label: "Gram", value: "Gram" },
      { label: "Kilogram", value: "Kilogram" },
      { label: "Ons", value: "Ons" },
      { label: "Mililiter", value: "Mililiter" },
      { label: "Liter", value: "Liter" },
      { label: "Pcs", value: "Pcs" },
      { label: "Box", value: "Box" },
      { label: "Pack", value: "Pack" },
      { label: "Dus", value: "Dus" },
      { label: "Botol", value: "Botol" },
      { label: "Sachet", value: "Sachet" },
      { label: "Lembar", value: "Lembar" },
      { label: "Unit", value: "Unit" },
      { label: "Kardus", value: "Kardus" },
      { label: "Galon", value: "Galon" },
      { label: "Karung", value: "Karung" },
      { label: "Slop", value: "Slop" },
      { label: "Tray", value: "Tray" },
      { label: "Keping", value: "Keping" },
      { label: "Cup", value: "Cup" },
    ],
  },

  {
    name: "description",
    label: "Deskripsi",
    placeholder: "Masukkan deskripsi bahan",
    type: "textarea",
  },
];

export type Ingredients = z.infer<typeof formSchema>;
