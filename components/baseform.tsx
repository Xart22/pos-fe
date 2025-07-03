// BaseForm.tsx
import {
  useForm,
  Controller,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";

type Option = { label: string; value: string };

interface FieldConfig<T extends FieldValues> {
  name: keyof T;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "textarea" | "select";
  options?: Option[];
}

interface BaseFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void | Promise<void>;
  fields: FieldConfig<T>[];
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-6 max-w-md  rounded-lg shadow-md"
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
                  {field.type === "textarea" ? (
                    <Textarea {...inputField} placeholder={field.placeholder} />
                  ) : field.type === "select" && field.options ? (
                    <Controller
                      name={field.name as any}
                      control={form.control}
                      render={({ field: selectField }) => (
                        <Select
                          options={field.options}
                          value={field.options?.find(
                            (opt) => opt.value === selectField.value
                          )}
                          onChange={(val) => selectField.onChange(val?.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                    />
                  ) : (
                    <Input
                      {...inputField}
                      type={field.type === "number" ? "number" : "text"}
                      //uppercase value={String(inputField.value)}
                      value={
                        field.name === "kode" && inputField.value
                          ? String(inputField.value).toUpperCase()
                          : inputField.value
                      }
                      placeholder={field.placeholder}
                    />
                  )}
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
