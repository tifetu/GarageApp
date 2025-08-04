import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
