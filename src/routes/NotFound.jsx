import { Link } from "react-router-dom";
import { selectUser } from "../redux/user/selectors";
import { connect } from "react-redux";

function mapStoreToProps(store) {
  return {
    user: selectUser(store),
  };
}

function InnerNotFound({ user }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-center font-bold text-4xl mt-10">Not Found</h2>
      <div className="mt-6 text-2xl">
        {!!user && (
          <p>
            Go{" "}
            <Link to="/about" className="text-blue-500">
              Home
            </Link>
          </p>
        )}
        {!user && (
          <p>
            Go{" "}
            <Link to="/auth/login" className="text-blue-500">
              login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

const NotFound = connect(mapStoreToProps)(InnerNotFound);

export default NotFound;
