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
import { formSchema, Categories } from "@/lib/schemas/categoriesSchema";
import ApiClient from "@/lib/services/network/apiClient";

export default function FormCreateCategories() {
  const form = useForm<Categories>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: Categories) => {
    console.log("Form Data:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-6 border rounded-lg shadow-md w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kategori</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama kategori" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </form>
    </Form>
  );
}
