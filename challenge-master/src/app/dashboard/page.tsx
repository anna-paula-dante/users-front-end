"use client";
import Header from "@/components/header";
import { UserTable } from "@/components/userTable";
import { useUsers } from "@/hooks/useUsers";

export default function Home() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários</p>;

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center px-20 gap-5 p-5">
        <h1 className="text-2xl">Dashboard de Usuarios</h1>
        <UserTable users={users} />
      </div>
    </div>
  );
}
