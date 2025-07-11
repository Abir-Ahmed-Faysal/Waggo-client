import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Private = ({ children }) => {
  const location = useLocation();
  const { user,  loading } = useAuth();
  if (loading) {
    return (
      <div
        className="lg:h-[calc(100vh-338px)] h-[calc(100vh-580px)] md:h-[calc(100vh-450px)]
"
      >
        <span className="loading absolute  top-[50%] left-[50%] loading-xl loading-spinner text-secondary"></span>
      </div>
    );
  }
  if (!user || !user.email) {
    return (
      <Navigate to={"/logIn"} state={{ from: location.pathname }}></Navigate>
    );
  }

  return <div>{children}</div>;
};

export default Private;
