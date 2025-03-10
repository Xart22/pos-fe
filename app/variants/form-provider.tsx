import { useFieldArray, useForm } from "react-hook-form";
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
import { Variant, variantSchema } from "@/lib/schemas/variantSchema";

export default function VariantForm({
  onSubmit,
}: {
  onSubmit: (data: Variant) => void;
}) {
  const form = useForm<Variant>({
    resolver: zodResolver(variantSchema),
    defaultValues: { name: "", options: [] }, // Awalnya options kosong
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-6 w-full max-w-md border rounded-lg"
      >
        {/* Input Nama Variant */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Variant</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama variant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Options (Dapat Ditambah & Dihapus) */}
        <div className="space-y-2">
          <FormLabel>Opsi Variant</FormLabel>
          {fields.map((option, index) => (
            <div key={option.id} className="flex space-x-2 items-center">
              <FormField
                control={form.control}
                name={`options.${index}.name`}
                render={({ field }) => (
                  <FormItem>
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
                    <FormControl>
                      <Input type="number" placeholder="Harga" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => remove(index)}>
                Hapus
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => append({ name: "", price: "" })}>
            + Tambah Opsi
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </form>
    </Form>
  );
}
