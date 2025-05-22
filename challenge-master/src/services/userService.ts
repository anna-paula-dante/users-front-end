"use client";
import { user } from "@/components/userTable";
import Cookies from "js-cookie";

export async function getUsers() {
  const jwtToken = Cookies.get("token");
  const response = await fetch("http://localhost:3001/664/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error");
  }
  return response.json();
}

export async function deleteUser(id: unknown) {
  const jwtToken = Cookies.get("token");
  const response = await fetch(`http://localhost:3001/664/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error");
  }
  return response.json();
}

export async function updateUser(user: user) {
  const jwtToken = Cookies.get("token");
  const response = await fetch(`http://localhost:3001/664/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar usuário");
  }

  return response.json();
}
