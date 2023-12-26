"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form
        onSubmit={() => {
          console.log(email, password);
          if (!email || !password) {
            console.log("Email and password are required ");
          }
        }}>
        <label htmlFor="emailInput">
          <p>Email</p>
          <Input
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </label>
        <label htmlFor="passwordInput">
          <p>Password</p>
          <Input
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            type="password"
          />
        </label>
        <Button type="submit">Login</Button>
      </form>
    </>
  );
}
