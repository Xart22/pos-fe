"use client";

import ApiClient from "@/lib/services/network/apiClient";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import {
  formSchema,
  Ingredients,
  fieldsIngredients,
} from "@/lib/schemas/ingredientsSchema";
import BaseForm from "@/components/baseform";
import { ColumnDef } from "@tanstack/react-table";
import { ModalForm } from "./modal-form";

export default function FormPage() {
  const [data, setData] = useState<Ingredients[]>([]);

  const getData = async () => {
    try {
      const response = await ApiClient.get("/ingredients");

      if (response.status === 200) {
        setData(response.data.data);
      } else {
        console.error("Error fetching data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const onSubmit = async (data: Ingredients) => {
    try {
      const response = await ApiClient.post("/ingredients/store", data);
      if (response.status === 200) {
        console.log("Data berhasil disimpan");
        await getData();
      } else {
        console.error("Error saving data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const onSubmitEdit = async (data: Ingredients): Promise<void> => {
    try {
      const response = await ApiClient.post(`/ingredients/update/${data.id}`, {
        name: data.name,
      });
      if (response.status === 200) {
        console.log("Data berhasil diubah");
        await getData();
      } else {
        console.error("Error saving data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const onSubmitDelete = async (data: Ingredients): Promise<void> => {
    try {
      const response = await ApiClient.delete(`/ingredients/delete/${data.id}`);
      if (response.status === 200) {
        console.log("Data berhasil diubah");
        await getData();
      } else {
        console.error("Error saving data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const columns: ColumnDef<Ingredients>[] = [
    {
      accessorKey: "kode",
      header: "Kode Bahan",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "harga",
      header: "Harga",
    },
    {
      accessorKey: "stock",
      header: "Stok",
    },
    {
      accessorKey: "satuan",
      header: "Satuan",
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
    },
    {
      header: "Actions",
      id: "actions",

      cell: ({ row }) => {
        const categories = row.original;
        return (
          <div className="flex space-x-2">
            <ModalForm
              type={"edit"}
              onSubmit={onSubmitEdit}
              formSchema={formSchema}
              fieldsCategories={fieldsIngredients}
              defaultValues={categories}
            />
            <ModalForm
              type={"delete"}
              onSubmit={onSubmitDelete}
              formSchema={formSchema}
              fieldsCategories={fieldsIngredients}
              defaultValues={categories}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col space-y-4 p-6 w-full md:w-3/4 lg:w-2/3 md:flex-row md:space-x-4">
      <BaseForm
        schema={formSchema}
        onSubmit={onSubmit}
        fields={fieldsIngredients.map(({ type, ...rest }) => ({
          ...rest,
          type:
            type === "number" ||
            type === "text" ||
            type === "textarea" ||
            type === "select" ||
            typeof type === "undefined"
              ? type
              : undefined,
        }))}
      />
      <div className="rounded-lg shadow-md p-6">
        <DataTable columns={columns} data={data} onFetchData={getData} />
      </div>
    </div>
  );
}
