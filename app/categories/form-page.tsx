"use client";

import ApiClient from "@/lib/services/network/apiClient";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import {
  formSchema,
  Categories,
  fieldsCategories,
} from "@/lib/schemas/categoriesSchema";
import BaseForm from "@/components/baseform";
import { ColumnDef } from "@tanstack/react-table";
import { ModalForm } from "./modal-form";

export default function FormPage() {
  const [data, setData] = useState<Categories[]>([]);

  const getData = async () => {
    try {
      const response = await ApiClient.get("/categories");
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Error fetching data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const onSubmit = async (data: Categories) => {
    try {
      const response = await ApiClient.post("/categories/store", data);
      if (response.status === 200) {
        console.log("Data berhasil disimpan");
        getData();
      } else {
        console.error("Error saving data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const onSubmitEdit = async (data: Categories): Promise<void> => {
    try {
      const response = await ApiClient.post(`/categories/update/${data.id}`, {
        name: data.name,
      });
      if (response.status === 200) {
        console.log("Data berhasil diubah");
        getData();
      } else {
        console.error("Error saving data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const onSubmitDelete = async (data: Categories): Promise<void> => {
    try {
      const response = await ApiClient.delete(`/categories/delete/${data.id}`);
      if (response.status === 200) {
        console.log("Data berhasil diubah");
        getData();
      } else {
        console.error("Error saving data:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const columns: ColumnDef<Categories>[] = [
    {
      accessorKey: "name",
      header: "Name",
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
              fieldsCategories={fieldsCategories}
              defaultValues={categories}
            />
            <ModalForm
              type={"delete"}
              onSubmit={onSubmitDelete}
              formSchema={formSchema}
              fieldsCategories={fieldsCategories}
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
    <div className="flex flex-row gap-4 p-4">
      <BaseForm
        schema={formSchema}
        onSubmit={onSubmit}
        fields={fieldsCategories}
      />
      <div className=" overflow-auto rounded-lg shadow-md p-6">
        <DataTable columns={columns} data={data} onFetchData={getData} />
      </div>
    </div>
  );
}
