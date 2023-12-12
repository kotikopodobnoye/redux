import { classNames } from "../../utils/class-names";

export default function Label({ children, className, ...props }) {
  return (
    <label
      className={classNames("text-xl font-semibold text-gray-800", className)}
      {...props}
    >
      {children}
    </label>
  );
}
