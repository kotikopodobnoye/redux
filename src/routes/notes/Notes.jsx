import { useEffect } from "react";
import { Link } from "react-router-dom";
import NoteCard from "../../components/note/NoteCard";
import Button from "../../components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getNotes } from "../../redux/notes/actions";
import { selectUser } from "../../redux/user/selectors";

export default function Notes() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { data, loading } = useSelector((store) => store.notes);

  useEffect(() => {
    dispatch(getNotes(user.id));
  }, [dispatch, user.id]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <main className="flex flex-col gap-2 mx-2 sm:mx-4 md:mx-12">
      <h2 className="text-center font-bold text-4xl mt-10">Notes</h2>

      <Button className="max-w-xs mx-auto">
        <Link to={"/notes/create"}>New note</Link>
      </Button>

      {loading && <div>Loading notes...</div>}

      {!!data.length && !loading && (
        <div className="flex flex-col gap-2">
          {data.map((note) => (
            <NoteCard key={note.id} {...note} onDelete={handleDelete} />
          ))}
        </div>
      )}
      {!data.length && !loading && (
        <p className="text-center mt-6 font-semibold text-2xl">
          No notes now. Make a new one!
        </p>
      )}
    </main>
  );
}
