"use client";
import { Menu, menuSchema } from "@/lib/schemas/menuSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormPage() {
  const form = useForm<Menu>({
    resolver: zodResolver(menuSchema),
  });

  const [data, setData] = useState<Menu[]>([]);

  const onSubmit = async (data: Menu) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Menu</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input type="text" {...form.register("name")} placeholder="Name" />
        <input type="number" {...form.register("price")} placeholder="Price" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
