import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function Header() {
  const handleExit = () => {
    Cookies.remove("token");
    redirect("/sign-in");
  };
  return (
    <div className="flex items-center justify-between px-20 h-[80px] w-full border-b-2 border-slate-400">
      <h2 className="text-lg">Bem vindo</h2>
      <Button className="hover:bg-red-500 text-white" onClick={handleExit}>
        <LogOut />
      </Button>
    </div>
  );
}
