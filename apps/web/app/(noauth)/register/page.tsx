"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "../actions";

export default function RegisterPage() {
  const [error, registerAction] = useFormState(register, "");

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <form action={registerAction} className="flex flex-col gap-[20px]">
        <label htmlFor="nameInput">
          <p>Name</p>
          <Input name="name" id="nameInput" required={true} />
        </label>
        <label htmlFor="emailInput">
          <p>Email</p>
          <Input name="email" id="emailInput" type="email" required={true} />
        </label>
        <label htmlFor="passwordInput">
          <p>Password</p>
          <Input
            name="password"
            id="passwordInput"
            required={true}
            type="password"
          />
        </label>
        {error.length ? <p>{error}</p> : null}
        <SubmitButton />
      </form>
      <Link href="/login" prefetch={false}>
        Login Instead
      </Link>
      <Link href="/" prefetch={false}>
        Go Back to Home
      </Link>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending}>
      Register
    </Button>
  );
};
