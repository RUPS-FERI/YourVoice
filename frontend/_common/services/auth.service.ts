import { HttpStatusCode } from "@/utils/HttpStatusCode";

export namespace AuthService {
  export const signup = async (payload: {
    username: string;
    password: string;
    email: string;
  }) => {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === HttpStatusCode.CREATED.valueOf()) {
      return response.json();
    }
    throw new Error(
      "Registration failed. Username or email might already exist",
    );
  };

  export const signin = async (payload: {
    username: string;
    password: string;
  }) => {
    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === HttpStatusCode.OK.valueOf()) {
      return response.json();
    }
    throw new Error("Incorrect username or password");
  };
}
