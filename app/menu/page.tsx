import { Metadata } from "next";
import MenuForm from "./form-page";

export const metadata: Metadata = {
  title: "Manage Menu",
  description: "Manage menu for your products",
};

export default function Menu() {
  return <MenuForm />;
}
