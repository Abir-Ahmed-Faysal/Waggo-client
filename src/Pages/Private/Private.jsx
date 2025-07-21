import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../components/Spinner";

const Private = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner></Spinner>;
  }
  if (!user || !user.email) {
    return (
      <Navigate to={"/logIn"} state={{ from: location.pathname }}></Navigate>
    );
  }

  return <div>{children}</div>;
};

export default Private;
