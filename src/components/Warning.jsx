import { classNames } from "../utils/class-names";

export default function Warning({ className, children }) {
  return (
    <div
      className={classNames(
        "py-1 px-2 rounded-md bg-red-500 border-red-500 border bg-opacity-25",
        className
      )}
    >
      {children}
    </div>
  );
}
