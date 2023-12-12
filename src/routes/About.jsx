import { Link } from "react-router-dom";
import Button from "../components/form/Button";
import { formatDate } from "../utils/date";

import { useSelector } from "react-redux";

import { selectUser } from "../redux/user/selectors";

export default function About() {
  const user = useSelector(selectUser);

  if (user?.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-center font-bold text-4xl mt-10">About me</h2>
      <div className="mt-16 text-2xl">
        <p className="text-center">
          <span className="font-semibold">Email: </span>{" "}
          <span className="text-gray-600">{user.email}</span>
        </p>
        <p className="text-center">
          <span className="font-semibold">Username: </span>{" "}
          <span className="text-gray-600">{user.username}</span>
        </p>
        <p className="text-center">
          <span className="font-semibold">Registered at: </span>{" "}
          <span className="text-gray-600">
            {formatDate(new Date(user.createdAt))}
          </span>
        </p>
        <Button className="mx-auto mt-5">
          <Link to={"/notes"}>View notes</Link>
        </Button>
      </div>
    </div>
  );
}
