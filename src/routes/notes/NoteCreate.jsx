import { z } from "zod";
import { useForm } from "../../hooks/useForm";
import { useCallback, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Warning from "../../components/Warning";
import Label from "../../components/form/Label";
import Button from "../../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import Textarea from "../../components/form/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { createNote } from "../../redux/notes/actions";

const createNoteSchema = z.object({
  title: z.string().min(3),
  body: z.string().optional(),
});

export default function NoteCreate() {
  const navigate = useNavigate();
  const createNoteForm = useForm();
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleSubmit = useCallback(() => {
    const result = createNoteSchema.safeParse(createNoteForm.payload);

    if (!result.success) {
      return setErrors(result.error.flatten());
    }

    setErrors({});

    dispatch(createNote({ ...createNoteForm.payload, userId: user.id })).then(
      (note) => {
        navigate(`/notes/${note.id}`);
      }
    );
  }, [createNoteForm.payload, dispatch, navigate, user.id]);

  return (
    <div className="p-2">
      <Form onSubmit={handleSubmit} className="max-w-[640px] mx-auto">
        <div className="flex">
          <Button className="px-4">
            <Link to="/notes">Back</Link>
          </Button>
        </div>
        <h2 className="text-3xl font-bold text-center">Create note</h2>
        {errors.submitError && <Warning>{errors.submitError}</Warning>}
        <Label>Title</Label>
        {errors.fieldErrors?.["title"] && (
          <Warning>{errors.fieldErrors["title"].join(" ")}</Warning>
        )}
        <Input
          name="title"
          placeholder="Do react homework"
          onChange={createNoteForm.handleInput}
        />
        {errors.fieldErrors?.["body"] && (
          <Warning>{errors.fieldErrors["body"].join(" ")}</Warning>
        )}
        <Label>Body</Label>
        <Textarea
          name="body"
          placeholder="Body"
          onChange={createNoteForm.handleInput}
        />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  );
}
