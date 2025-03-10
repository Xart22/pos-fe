import { Metadata } from "next";

import VariantForm from "./varian-form";

export const metadata: Metadata = {
  title: "Manage Variants",
  description: "Manage variants for your products",
};

export default function VariantPage() {
  return <VariantForm />;
}
