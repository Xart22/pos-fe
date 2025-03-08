"use client";

import { Categories } from "@/lib/schemas/categoriesSchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Categories>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
