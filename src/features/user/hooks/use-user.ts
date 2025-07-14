import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/user";

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });
}