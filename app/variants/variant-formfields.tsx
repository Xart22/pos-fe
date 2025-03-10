import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Variant } from "@/lib/schemas/variantSchema";

export default function VariantFormFields() {
  const { control, register } = useFormContext<Variant>(); // ⬅ Pastikan tidak null
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <>
      {/* Input Nama Variant */}
      <label>Nama Variant</label>
      <Input {...register("name")} placeholder="Masukkan nama variant" />

      {/* Input Options */}
      <label>Opsi Variant</label>
      {fields.map((option, index) => (
        <div key={option.id} className="flex space-x-2 items-center">
          <Input
            {...register(`options.${index}.name`)}
            placeholder="Nama Opsi"
          />
          <Input
            {...register(`options.${index}.price`)}
            type="number"
            placeholder="Harga"
          />
          <Button type="button" onClick={() => remove(index)}>
            Hapus
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({ name: "", price: "0" })}>
        + Tambah Opsi
      </Button>
    </>
  );
}
