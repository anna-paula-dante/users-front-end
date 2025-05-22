import { getUsers } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
    refetchOnWindowFocus: true,
  });
}
