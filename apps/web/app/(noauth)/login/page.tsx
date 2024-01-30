"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "../actions";

export default function LoginPage() {
  const [error, loginAction] = useFormState(login, "");

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <form action={loginAction} className="flex flex-col gap-[20px]">
        <label htmlFor="emailInput">
          <p>Email</p>
          <Input id="emailInput" type="email" required={true} />
        </label>
        <label htmlFor="passwordInput">
          <p>Password</p>
          <Input id="passwordInput" required={true} type="password" />
        </label>
        {error.length ? <p>{error}</p> : null}
        <SubmitButton />
      </form>
      <Link href="/register" prefetch={false}>
        Register Instead
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
      Login
    </Button>
  );
};
