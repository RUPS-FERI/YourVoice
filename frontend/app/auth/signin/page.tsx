"use client";

import React from "react";
import { Button, Form, Input, Link } from "@nextui-org/react";
import { Alert } from "@nextui-org/alert";

import { AuthService } from "@/app/_common/services/auth.service";
import { useRedirectIfAuthenticated } from "@/app/_common/hooks/auth.hook";

export default function Signin() {
  const [error, serError] = React.useState("");

  useRedirectIfAuthenticated();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));

    try {
      await AuthService.get.signin({
        username: payload.username as string,
        password: payload.password as string,
      });
    } catch (err) {
      serError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-xl mx-auto gap-10">
      <h1 className="text-3xl">Signin</h1>
      <Form
        className="w-full gap-7"
        validationBehavior="native"
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          autoComplete={"username"}
          errorMessage="Username or password is inccorect"
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username or email"
          type="text"
        />

        <Input
          isRequired
          autoComplete={"current-password"}
          errorMessage="Username or password is inccorect"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
        />
        <p className="text-gray-500 text-xs">
          Don&#39;t have an account?
          <Link className="text-xs ml-1" href={"/auth/signup"}>
            Signup
          </Link>
        </p>
        {error && <Alert color={"danger"}>{error}</Alert>}

        <Button className={"w-full"} color="primary" type="submit">
          Signin
        </Button>
      </Form>
    </div>
  );
}
