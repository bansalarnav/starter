"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function LoginPage() {
  return (
    <>
      <form>
        <p>Email</p>
        <Input />
        <p>Password</p>
        <Input />
        <Button>Login</Button>
      </form>
    </>
  );
}
