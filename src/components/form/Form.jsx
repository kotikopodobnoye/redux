import { classNames } from "../../utils/class-names";

export default function Form({ onSubmit, className, children, ...props }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(
        "p-2 rounded-md border flex flex-col gap-2",
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
}
