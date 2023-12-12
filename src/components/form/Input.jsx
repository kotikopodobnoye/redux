import { classNames } from "../../utils/class-names";

export default function Input({ className, ...props }) {
  return (
    <input
      className={classNames(
        "py-1 px-2 text-gray-700 leading-normal focus:outline-none bg-transparent border-b-2 border-gray-400 appearance-none",
        className
      )}
      {...props}
    />
  );
}
