import { DataTable } from "./data-table";
import FormCreateCategories from "./form-create";

export default function FormPage() {
  return (
    <div className="border">
      <FormCreateCategories />
      <DataTable columns={[]} data={[]} />
    </div>
  );
}
