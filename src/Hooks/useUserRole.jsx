import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecureApi from "./useSecureApi";

const useUserRole = () => {
  const api = useSecureApi();
  const { user } = useAuth();

  const { isLoading, error, data:role, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      const response = await api.get(`/user-role?email=${user.email}`);
      return response.data.role; 
    },
  });

  return { role, error, isLoading, refetch };
};

export default useUserRole;
