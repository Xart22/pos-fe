import { Metadata } from "next";
import FormCreateCategories from "./form-page";

export const metadata: Metadata = {
  title: "Manage Ingredients",
  description: "Manage ingredients for your products",
};

export default function CategoriesPage() {
  return <FormCreateCategories />;
}
