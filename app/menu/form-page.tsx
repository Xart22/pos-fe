"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { menuSchema, Menu, fieldsMenu } from "@/lib/schemas/menuSchema";
import { useEffect, useState } from "react";
import { Categories } from "@/lib/schemas/categoriesSchema";
import { Variant } from "@/lib/schemas/variantSchema";
import ApiClient from "@/lib/services/network/apiClient";
import { MultiSelect } from "@/components/multi-select";
import { convertToRupiah } from "@/helpers/format-rupiah";

export default function MenuForm() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const form = useForm<Menu>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      image: new File([], ""),
      description: "",
      price: "",
      category: "",
      variants: [],
      stock: "",
      is_active: false,
      is_online: false,
    },
  });

  const getDropdown = async () => {
    const responsecategories = await ApiClient.get("/categories");
    console.log(responsecategories.data);
    setCategories(responsecategories.data);
    const responsevariants = await ApiClient.get("/variants");
    setVariants(responsevariants.data);
  };

  const onSubmit = (data: Menu) => {
    console.log(data);
  };

  useEffect(() => {
    getDropdown();
  }, []);
  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-6 w-full max-w-md border rounded-lg"
      >
        {fieldsMenu.map((fieldConfig) => {
          if (fieldConfig.type === "textarea") {
            return (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name as keyof Menu}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={fieldConfig.placeholder}
                        value={field.value?.toString() || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (fieldConfig.type === "file") {
            return (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name as keyof Menu}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (fieldConfig.type === "select") {
            return (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name as keyof Menu}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString() || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.id ? option.id.toString() : ""}
                          >
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (fieldConfig.type === "array") {
            return (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name as keyof Menu}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={variants.map((v) => ({
                          value: v.id ? v.id.toString() : "",
                          label: v.name,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={field.value as string[]}
                        placeholder={fieldConfig.placeholder}
                        maxCount={2}
                        className="bg-white hover:bg-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (fieldConfig.type === "text" || fieldConfig.type === "number") {
            return (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name as keyof Menu}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={fieldConfig.type}
                        placeholder={fieldConfig.placeholder}
                        value={field.value?.toString() || ""}
                        onChange={
                          field.name === "price"
                            ? (e) =>
                                field.onChange(convertToRupiah(e.target.value))
                            : field.onChange
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (
            fieldConfig.name === "is_active" ||
            fieldConfig.name === "is_online"
          ) {
            return (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name as keyof Menu}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          return null;
        })}

        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </form>
    </Form>
  );
}
