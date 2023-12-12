import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../redux/user/selectors";

export default function WithoutAuthRoute({ children }) {
  const user = useSelector(selectUser);

  console.log(user);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}
