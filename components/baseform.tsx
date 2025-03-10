import {
  useForm,
  FieldValues,
  DefaultValues,
  Path,
  PathValue,
} from "react-hook-form";
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
import { z } from "zod";

interface BaseFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues?: DefaultValues<T>; // ✅ Pastikan tipe sudah sesuai
  onSubmit: (data: T) => Promise<void>;
  fields: { name: keyof T; label: string; placeholder?: string }[];
}

export default function BaseForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  fields,
}: BaseFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? ({} as DefaultValues<T>),
  });

  const handleSubmit = async () => {
    try {
      await onSubmit(form.getValues());
      fields.forEach((field) =>
        form.setValue(field.name as Path<T>, "" as PathValue<T, Path<T>>)
      );
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 p-6 w-full  rounded-lg shadow-md max-w-md"
      >
        {fields.map((field) => (
          <FormField
            key={String(field.name)}
            control={form.control}
            name={field.name as any}
            render={({ field: inputField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input placeholder={field.placeholder} {...inputField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </form>
    </Form>
  );
}
