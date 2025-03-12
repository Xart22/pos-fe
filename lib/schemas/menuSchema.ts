import * as z from "zod";
import { Variant } from "./variantSchema";
import { Categories } from "./categoriesSchema";

export const menuSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter" }),
  image: z.string().min(1, { message: "Gambar harus diisi" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi" }),
  price: z.string().min(1, { message: "Harga harus diisi" }),
  category: z.string().min(1, { message: "Kategori harus dipilih" }),
  variants: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(1, { message: "Nama harus diisi" }),
    })
  ),
  stock: z.string().min(1, { message: "Stok harus diisi" }),
  is_active: z.boolean(),
  is_online: z.boolean(),
});

export const fieldsMenu: {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "array" | "select" | "textarea" | "file";
  options?: Variant[] | Categories[];
}[] = [
  {
    name: "name",
    label: "Nama Menu",
    placeholder: "Masukkan nama menu",
    type: "text",
  },
  {
    name: "image",
    label: "Gambar Menu",
    placeholder: "Masukkan gambar menu",
    type: "file",
  },
  {
    name: "description",
    label: "Deskripsi",
    placeholder: "Masukkan deskripsi menu",
    type: "textarea",
  },
  {
    name: "price",
    label: "Harga",
    placeholder: "Masukkan harga menu",
    type: "number",
  },
  {
    name: "category",
    label: "Kategori",
    type: "select",
    options: [],
  },
  {
    name: "variants",
    label: "Variant",
    type: "select",
    options: [],
  },
  {
    name: "stock",
    label: "Stok",
    placeholder: "Masukkan stok menu",
    type: "number",
  },
  {
    name: "is_active",
    label: "Aktif",
    type: "text",
  },
  {
    name: "is_online",
    label: "Online",
    type: "text",
  },
];

export type Menu = z.infer<typeof menuSchema>;
