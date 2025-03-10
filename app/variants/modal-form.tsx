import BaseForm from "@/components/baseform";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalFormProps<T> {
  type: "edit" | "delete";

  formSchema: any;
  fields: any;
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: T;
}

export function ModalForm({
  type,
  formSchema,
  fields,
  onSubmit,
  defaultValues,
}: ModalFormProps<any>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {type === "edit" ? (
          <Button className="bg-yellow-500">Edit</Button>
        ) : (
          <Button className="bg-red-500">Delete</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "edit" ? "Edit Category" : "Delete Category"}
          </DialogTitle>
          <DialogDescription>
            {type === "edit"
              ? "Edit the category name"
              : "Are you sure you want to delete this category?"}
          </DialogDescription>
        </DialogHeader>
        {type === "edit" ? (
          <BaseForm
            schema={formSchema}
            fields={fields}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          />
        ) : (
          <DialogFooter>
            <Button
              className="bg-red-500"
              onClick={() => onSubmit(defaultValues)}
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button className="bg-gray-500" type="button">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
