"use client";

import React from "react";
import { Button, Form, Input, Link } from "@nextui-org/react";

export default function Signin() {
  const [action, setAction] = React.useState("");

  return (
    <div className="flex flex-col justify-center w-full max-w-xl mx-auto gap-10">
      <h1 className="text-3xl">Signin</h1>
      <Form
        className="w-full gap-7"
        validationBehavior="native"
        onReset={() => setAction("reset")}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          setAction(`submit ${JSON.stringify(data)}`);
        }}
      >
        <Input
          isRequired
          errorMessage="Username or password is inccorect"
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username or email"
          type="text"
        />

        <Input
          isRequired
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
        <Button className={"w-full"} color="primary" type="submit">
          Signin
        </Button>

        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>
    </div>
  );
}
