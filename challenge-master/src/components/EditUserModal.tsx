import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/userService";
import { Input } from "./ui/input";
import { user } from "./userTable";

const FormSchema = z.object({
  id: z.number(),
  name: z.string().min(2, {
    message: "Nome precisa ser maior do que dois caracteres.",
  }),
  email: z.string().email({
    message: "Digite um email valido.",
  }),
  password: z.string().min(6, {
    message: "senha precisa de mais do que 6 caracteres.",
  }),
  isAdmin: z.boolean(),
  phone: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, {
    message: "telefone invalido",
  }),
});

interface EditUserModalProps {
  user: {
    id?: number;
    name: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    phone: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function EditUserModal({ user, isOpen, onClose }: EditUserModalProps) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: user,
  });

  const editMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
    onError: () => {
      toast.error("Erro ao atualizar usuário");
    },
  });

  const onSubmit = (data: user) => {
    console.log(data);
    editMutation.mutate({ ...data });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="sm:w-5/6 space-y-6 py-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  {formState.errors.name && (
                    <FormMessage>{formState.errors.name.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  {formState.errors.email && (
                    <FormMessage>{formState.errors.email.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Administrador</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Telefone:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu numero de telefone"
                      {...field}
                    />
                  </FormControl>
                  {formState.errors.name && (
                    <FormMessage>{formState.errors.name.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit">Salvar alterações</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
