import { Metadata } from "next";
import FormCreateCategories from "./form-page";

export const metadata: Metadata = {
  title: "Manage Categories",
  description: "Manage categories for your products",
};

export default function CategoriesPage() {
  return <FormCreateCategories />;
}
