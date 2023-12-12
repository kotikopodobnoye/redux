import { NavLink, Outlet } from "react-router-dom";
import { classNames } from "../utils/class-names";
import { connect } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import { logout } from "../redux/user/actions";

function mapStoreToProps(store) {
  return {
    user: selectUser(store),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export function InnerLayout({ user, logout }) {
  return (
    <div className="">
      <div className="flex flex-col gap-3 pt-4">
        <header className="flex justify-between">
          <div className="text-xl font-semibold">Hello, {user.email}</div>

          <div className="flex gap-5">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                classNames(
                  "text-xl font-semibold",
                  !isActive && "text-slate-400",
                  isActive && "text-black pointer-events-none"
                )
              }
            >
              About
            </NavLink>
            <NavLink
              to="/notes"
              end={true}
              className={({ isActive }) =>
                classNames(
                  "text-xl font-semibold",
                  !isActive && "text-slate-400",
                  isActive && " text-black pointer-events-none"
                )
              }
            >
              Notes
            </NavLink>
            <button
              onClick={() => logout()}
              className="text-xl font-semibold text-slate-400"
            >
              Log out
            </button>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const Layout = connect(mapStoreToProps, mapDispatchToProps)(InnerLayout);

export default Layout;
