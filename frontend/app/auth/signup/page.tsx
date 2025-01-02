"use client";

import React, { FormEvent } from "react";
import { Button, Form, Input, Link } from "@nextui-org/react";
import { Alert } from "@nextui-org/alert";

import { AuthService } from "@/_common/services/auth.service";

export default function Signup() {
  const [password, setPassword] = React.useState<null | string>(null);
  const [rePassword, setRePassword] = React.useState<null | string>(null);
  const [error, setError] = React.useState<null | string>(null);

  const getPasswordError = () => {
    if (password && password.length < 8) {
      return "Password must be at least 8 characters";
    } else if (
      password &&
      !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
    ) {
      return "Password must contain at least 1 capital letter and number";
    }

    return null;
  };

  const getRePasswordError = () => {
    if (rePassword && password && rePassword !== password) {
      return "Passwords do not match";
    }

    return null;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await AuthService.signup({
        username: data.username as string,
        password: data.password as string,
        email: data.email as string,
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-xl mx-auto gap-10">
      <h1 className="text-3xl">Signup</h1>
      <Form
        className="gap-7 w-full"
        validationBehavior="native"
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          errorMessage="Invalid username"
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Invalid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          isRequired
          errorMessage={getPasswordError()}
          isInvalid={getPasswordError() !== null}
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password ?? ""}
          onValueChange={setPassword}
        />
        <Input
          isRequired
          errorMessage={getRePasswordError()}
          isInvalid={getRePasswordError() !== null}
          label="Re-password"
          labelPlacement="outside"
          name="rePassword"
          placeholder="Repeat your password"
          type="password"
          value={rePassword ?? ""}
          onValueChange={setRePassword}
        />
        {error && <Alert color={"danger"}>{error}</Alert>}
        <p className="text-gray-500 text-xs">
          Already have an account?
          <Link className="text-xs ml-1" href={"/auth/signin"}>
            Signin
          </Link>
        </p>
        <Button className={"w-full"} color="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
}
