import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropdownProps = {
  field: any;
  options: { label: string; value: string }[];
  placeholder?: string;
};

export default function FormDropdown({
  field,
  options,
  placeholder = "Pilih kategori",
}: DropdownProps) {
  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
      aria-label="Dropdown kategori"
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
