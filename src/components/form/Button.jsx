import { classNames } from "../../utils/class-names";

export default function Button({ className, children, ...props }) {
  return (
    <button
      className={classNames(
        "rounded-md bg-slate-500 text-white px-2 py-1 text-xl block",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
