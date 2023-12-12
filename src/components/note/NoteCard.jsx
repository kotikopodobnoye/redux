import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";

export default function NoteCard({ id, title, createdAt, onDelete }) {
  return (
    <div className="bg-gray-400 px-4 py-1 flex gap-1 justify-between">
      <div className="flex flex-col gap-1 sm:gap-4 sm:flex-row sm:items-center">
        <Link className="font-bold text-xl" to={`/notes/${id}`}>
          {title}
        </Link>
        <span>{formatDate(new Date(createdAt))}</span>
      </div>
      <div className="flex gap-1 items-center">
        <Link to={`/notes/${id}/edit`}>
          <img src="/icons/edit.svg" alt="Edit" className="w-5 h-5" />
        </Link>
        <img
          className="cursor-pointer w-5 h-5"
          onClick={() => onDelete(id)}
          alt="Delete"
          src="/icons/delete.svg"
        />
      </div>
    </div>
  );
}
