import { user } from "@/components/userTable";

export async function postLogin(data: { email: string; password: string }) {
  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Login inválido");
  }
  return response.json();
}

export async function postregister(data: user) {
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("falha ao registrar conta");
  }
  return response.json();
}
