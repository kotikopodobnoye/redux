import { useForm } from "../../hooks/useForm";
import { useCallback, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Warning from "../../components/Warning";
import Label from "../../components/form/Label";
import Button from "../../components/form/Button";
import { Link } from "react-router-dom";
import { baseSchema } from "./common";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/user/actions";

const loginSchema = baseSchema.extend();

export default function Login() {
  const loginForm = useForm();
  const [errors, setErrors] = useState({});

  const { loading, error } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    const result = loginSchema.safeParse(loginForm.payload);

    if (!result.success) {
      return setErrors(result.error.flatten());
    }

    setErrors({});

    dispatch(loginUser(loginForm.payload));
  }, [dispatch, loginForm.payload]);

  return (
    <div className="p-2">
      <Form onSubmit={handleSubmit} className="max-w-[640px] mx-auto">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        {error && <Warning>{error}</Warning>}
        <Label>Email</Label>
        {errors.fieldErrors?.["email"] && (
          <Warning>{errors.fieldErrors["email"].join(". ")}</Warning>
        )}
        <Input
          name="email"
          placeholder="Email"
          onChange={loginForm.handleInput}
        />
        <Label>Password</Label>
        {errors.fieldErrors?.["password"] && (
          <Warning>{errors.fieldErrors["password"].join(". ")}</Warning>
        )}
        <Input
          name="password"
          placeholder="Password"
          onChange={loginForm.handleInput}
          type="password"
        />
        <Button type="submit" disabled={loading}>
          Login
        </Button>
        <p className="text-center">
          Do not have a account? Register{" "}
          <Link className="text-slate-700" to="/auth/register">
            here
          </Link>
        </p>
      </Form>
    </div>
  );
}
