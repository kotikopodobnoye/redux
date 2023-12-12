import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../redux/user/selectors";

export default function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
