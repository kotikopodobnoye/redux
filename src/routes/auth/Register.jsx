import { z } from "zod";
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
import { registerUser } from "../../redux/user/actions";

const registerSchema = baseSchema
  .and(
    z.object({
      username: z.string().min(3),
      repeatPassword: z.string(),
    })
  )
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords should match",
    path: ["repeatPassword"],
  });

export default function Register() {
  const registerForm = useForm();
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { loading, error } = useSelector((store) => store.user);

  const handleSubmit = useCallback(() => {
    const result = registerSchema.safeParse(registerForm.payload);

    if (!result.success) {
      return setErrors(result.error.flatten());
    }

    setErrors({});

    dispatch(registerUser(registerForm.payload));
  }, [dispatch, registerForm.payload]);

  return (
    <div className="p-2">
      <Form onSubmit={handleSubmit} className="max-w-[640px] mx-auto">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        {error && <Warning>{error}</Warning>}
        <Label>Email</Label>
        {errors.fieldErrors?.["email"] && (
          <Warning>{errors.fieldErrors["email"].join(". ")}</Warning>
        )}
        <Input
          name="email"
          placeholder="Email"
          onChange={registerForm.handleInput}
          type="email"
        />
        <Label>Username</Label>
        {errors.fieldErrors?.["username"] && (
          <Warning>{errors.fieldErrors["username"].join(". ")}</Warning>
        )}
        <Input
          name="username"
          placeholder="Username"
          onChange={registerForm.handleInput}
        />
        <Label>Password</Label>
        {errors.fieldErrors?.["password"] && (
          <Warning>{errors.fieldErrors["password"].join(". ")}</Warning>
        )}
        <Input
          name="password"
          placeholder="Password"
          onChange={registerForm.handleInput}
          type="password"
        />
        <Label>Repeat password</Label>
        {errors.fieldErrors?.["repeatPassword"] && (
          <Warning>{errors.fieldErrors["repeatPassword"].join(". ")}</Warning>
        )}
        <Input
          name="repeatPassword"
          placeholder="Repeat password"
          onChange={registerForm.handleInput}
          type="password"
        />
        <Button type="submit" disabled={loading}>
          Register
        </Button>
        <p className="text-center">
          Already have a account? Login{" "}
          <Link className="text-slate-700" to="/auth/login">
            here
          </Link>
        </p>
      </Form>
    </div>
  );
}
