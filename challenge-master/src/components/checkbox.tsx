"use client";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxIsAdmin() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="isAdmin" />
      <label
        htmlFor="IsAdmin"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Administrador
      </label>
    </div>
  );
}
