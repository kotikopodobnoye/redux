import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "../../hooks/useForm";
import Input from "../../components/form/Input";
import Form from "../../components/form/Form";
import Warning from "../../components/Warning";
import Label from "../../components/form/Label";
import Button from "../../components/form/Button";
import Textarea from "../../components/form/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { selectNote } from "../../redux/notes/selectors";
import { editNote, getNotes } from "../../redux/notes/actions";
import Navigate404 from "../../components/Navigate404";

const editNoteSchema = z.object({
  title: z.string().min(3),
  body: z.string().optional(),
});

export default function NoteEdit() {
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { data, loading } = useSelector((store) => store.notes);

  const note = useSelector(selectNote(id));

  const navigate = useNavigate();

  const editForm = useForm();

  const setPayload = editForm.setPayload;

  useEffect(() => {
    if (!data.length && !note) {
      dispatch(getNotes(user.id));
    }
  }, [data.length, dispatch, note, user.id]);

  useEffect(() => {
    if (!note) {
      return;
    }

    setPayload({ title: note.title, body: note.body });
  }, [setPayload, note]);

  const handleSubmit = useCallback(() => {
    const result = editNoteSchema.safeParse(editForm.payload);

    if (!result.success) {
      return setErrors(result.error.flatten());
    }

    setErrors({});

    dispatch(editNote(Number(id), editForm.payload)).then(() => {
      navigate(`/notes/${id}`);
    });
  }, [dispatch, editForm.payload, id, navigate]);

  return (
    <div className="">
      {loading && <div>Loading note...</div>}

      {!loading && data.length && !note && <Navigate404 />}
      <Form onSubmit={handleSubmit} className="max-w-[640px] mx-auto">
        <div className="flex">
          <Button className="px-4">
            <Link to="/notes">Back</Link>
          </Button>
        </div>
        <h2 className="text-3xl font-bold text-center">Edit note</h2>
        {!!Object.keys(editForm.payload).length && (
          <>
            {errors.submitError && <Warning>{errors.submitError}</Warning>}
            <Label>Title</Label>
            {errors.fieldErrors?.["title"] && (
              <Warning>{errors.fieldErrors["title"].join(" ")}</Warning>
            )}
            <Input
              name="title"
              placeholder="Title"
              onChange={editForm.handleInput}
              value={editForm.payload.title}
            />
            {errors.fieldErrors?.["body"] && (
              <Warning>{errors.fieldErrors["body"].join(" ")}</Warning>
            )}
            <Label>Body</Label>
            <Textarea
              name="body"
              placeholder="Body"
              onChange={editForm.handleInput}
              value={editForm.payload.body}
            />
            <Button type="submit">Save</Button>
          </>
        )}
      </Form>
    </div>
  );
}
