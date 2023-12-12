import { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigate404 from "../../components/Navigate404";
import Button from "../../components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { deleteNote, getNotes } from "../../redux/notes/actions";
import { selectNote } from "../../redux/notes/selectors";

export default function Note() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { data, loading } = useSelector((store) => store.notes);

  const note = useSelector(selectNote(id));

  const handleDelete = useCallback(() => {
    dispatch(deleteNote(id)).then(() => {
      navigate("/notes");
    });
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (!data.length && !note) {
      dispatch(getNotes(user.id));
    }
  }, [data.length, dispatch, note, user.id]);

  return (
    <div className="flex flex-col gap-1 mx-2 sm:mx-4 md:mx-12">
      {loading && <div>Loading note...</div>}

      {!loading && data.length && !note && <Navigate404 />}

      {!loading && note && (
        <>
          <div className="flex">
            <Button className="px-4">
              <Link to="/notes">Back</Link>
            </Button>
          </div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-center">{note.title}</h1>
            <div className="flex gap-1 items-center">
              <Link to={`/notes/${id}/edit`}>
                <img src="/icons/edit.svg" alt="Edit" className="w-5 h-5" />
              </Link>
              <img
                className="cursor-pointer w-5 h-5"
                onClick={handleDelete}
                alt="Delete"
                src="/icons/delete.svg"
              />
            </div>
          </div>
          <pre className="text-xl p-2 font-sans">{note.body}</pre>
        </>
      )}
    </div>
  );
}
