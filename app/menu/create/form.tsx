"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema, Menu } from "@/lib/schemas/menuSchema";
import FormDropdown from "@/components/form-dropdown";
import ApiClient from "@/lib/services/network/apiClient";
import { useEffect, useState } from "react";
import { Category } from "@/lib/schemas/categoriesSchema";

export default function MyForm() {
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<Menu>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: Menu) => {
    console.log("Form Data:", data);
  };

  useEffect(() => {
    const controller = new AbortController();

    const getCategoryOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await ApiClient.get("/categories", {
          signal: controller.signal, // Tambahkan AbortController
        });
        setCategoryOptions(res.data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Gagal mengambil data kategori");
          console.error("API Error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    getCategoryOptions();

    return () => controller.abort(); // Cleanup
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-6 border rounded-lg shadow-md w-full max-w-md"
      >
        {/* Input Nama */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dropdown Kategori */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                {loading ? (
                  <p className="text-gray-500">Memuat kategori...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <FormDropdown
                    field={field}
                    options={categoryOptions.map((option) => ({
                      label: option.name,
                      value: String(option.id),
                    }))}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
