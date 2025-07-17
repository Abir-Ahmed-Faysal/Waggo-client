import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import Spinner from "../../components/Spinner";

const AdminCheck = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, error, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <Spinner></Spinner>
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
console.log(role);

  return <>{children}</>;
};

export default AdminCheck;
