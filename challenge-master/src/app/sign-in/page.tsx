"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginImage from "@/assets/login-img.png";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/services/authService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().trim().email({
    message: "Digite um email valido.",
  }),
  password: z.string().min(6, {
    message: "Senha precisa de mais do que 6 caracteres.",
  }),
});

export default function SignIn() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      toast.success("Login feito com sucesso!");
      Cookies.set("token", data.accessToken, { expires: 7 });
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Falha no login.");
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    loginMutation.mutate(data);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[linear-gradient(180deg,_rgba(241,241,241,1)_50%,_rgba(226,54,54,1)_50%)] px-5">
      <div className="flex items-center justify-center max-w-[925px] w-full bg-white rounded-2xl ">
        <div className="hidden sm:block">
          <Image src={loginImage} width={484} height={484} alt="login image" />
        </div>

        <div className=" flex flex-col p-5 justify-center md:max-w-[400px] w-full">
          <h1 className="text-3xl">Login</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="sm:w-5/6 space-y-6 py-5"
            >
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
                      <FormMessage>
                        {formState.errors.email.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    {formState.errors.password && (
                      <FormMessage>
                        {formState.errors.password.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Button type="submit">Login</Button>
                <Link
                  href={"/sign-up"}
                  className="text-center hover:text-blue-400 hover:underline"
                >
                  Cadastre-se
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
