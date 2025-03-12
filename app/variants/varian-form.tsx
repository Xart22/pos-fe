"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import {
  fieldsVariants,
  Variant,
  variantSchema,
} from "@/lib/schemas/variantSchema";
import ApiClient from "@/lib/services/network/apiClient";
import { DataTable } from "../categories/data-table";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ModalForm } from "../categories/modal-form";

export default function VariantForm() {
  const [data, setData] = useState<Variant[]>([]);
  const form = useForm<Variant>({
    resolver: zodResolver(variantSchema),
    defaultValues: { name: "", options: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const columns: ColumnDef<Variant>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "rules_min",
      header: "Minimal",
    },
    {
      accessorKey: "rules_max",
      header: "Maksimal",
    },
    {
      accessorKey: "options",
      header: "Opsi",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {row.original.options.map((option) => (
            <div key={option.id}>
              <p>{option.name}</p>
              <p>{option.price}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "Actions",
      id: "actions",

      cell: ({ row }) => {
        const categories = row.original;
        return (
          <div className="flex space-x-2">
            {/* <ModalForm
              type={"edit"}
              onSubmit={onSubmitEdit}
              formSchema={formSchema}
              fieldsCategories={fieldsCategories}
              defaultValues={categories}
            />
            <ModalForm
              type={"delete"}
              onSubmit={onSubmitDelete}
              formSchema={formSchema}
              fieldsCategories={fieldsCategories}
              defaultValues={categories}
            /> */}
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      const response = await ApiClient.get("/variants");
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Error fetching data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const onSubmit = async (data: Variant) => {
    console.log(data);
    try {
      const response = await ApiClient.post("/variants/store", data);
      if (response.status === 200) {
        getData();
        form.reset();
        console.log("Data berhasil disimpan");
      } else {
        console.error("Error saving data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-6 w-full max-w-md border rounded-lg"
        >
          {/* Looping fieldsVariants untuk input dinamis */}
          {fieldsVariants.map((fieldConfig) => {
            if (fieldConfig.type === "array") {
              return (
                <div key={fieldConfig.name} className="space-y-2">
                  {fields.map((option, index) => (
                    <div
                      key={option.id}
                      className="flex space-x-2 items-center"
                    >
                      <FormField
                        control={form.control}
                        name={`options.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Option</FormLabel>
                            <FormControl>
                              <Input placeholder="Nama Opsi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Harga</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Harga"
                                {...field}
                                value={
                                  typeof field.value === "string" ||
                                  typeof field.value === "number"
                                    ? field.value
                                    : ""
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className=" bg-red-500 text-white"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Hapus
                      </Button>
                    </div>
                  ))}
                  <Button
                    className="mt-5 bg-green-500 text-white"
                    type="button"
                    onClick={() => append({ name: "", price: "" })}
                  >
                    + Tambah Opsi
                  </Button>
                </div>
              );
            } else {
              return (
                <FormField
                  key={fieldConfig.name}
                  control={form.control}
                  name={fieldConfig.name as keyof Variant}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldConfig.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={fieldConfig.type}
                          placeholder={fieldConfig.placeholder}
                          {...field}
                          value={
                            typeof field.value === "string" ||
                            typeof field.value === "number"
                              ? field.value
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
          })}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Simpan
          </Button>
        </form>
      </Form>
      <DataTable columns={columns} data={data} onFetchData={getData} />
    </div>
  );
}
