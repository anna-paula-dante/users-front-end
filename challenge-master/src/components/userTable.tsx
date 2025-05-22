import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { CircleX, UserPen } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/userService";
import { toast } from "sonner";
import { useState } from "react";
import { EditUserModal } from "./EditUserModal";

export type user = {
  id?: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone: string;
};

type UserTableProps = {
  users: user[];
};

export function UserTable({ users }: UserTableProps) {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Usuário excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Erro ao excluir usuário");
    },
  });

  function handleDelete(id?: number) {
    deleteMutation.mutate(id);
  }

  return (
    <div>
      <Table className="border-2 ">
        <TableCaption>Tabela de usuarios.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Status</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="pl-8">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.isAdmin && "Administrador"}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div className="space-x-2 flex  items-center">
                  <Button
                    className="bg-green-400 hover:bg-green-600"
                    onClick={() => setSelectedUser(user)}
                  >
                    <UserPen />
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-800"
                  >
                    <CircleX />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
