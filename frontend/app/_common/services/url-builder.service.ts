import { HttpStatusCode } from "@/utils/HttpStatusCode";

export interface RequestParams {
  path: string[];
  body?: object;
  headers?: object;
}

export interface RequestParamsWithExpectedCode {
  path: string[];
  body?: object;
  headers?: object;
  expectedCode: HttpStatusCode;
}

export namespace ApiRequestService {
  const BASE_URL = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/api/`;

  const buildUrl = (parts: string[]) => `${BASE_URL}${parts.join("/")}`;

  const buildFetchBody = (
    params: Omit<RequestParams, "path">,
    method: string,
  ) => ({
    method: method,
    body: JSON.stringify(params.body),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("JWT_TOKEN") ?? "",
      ...(params.headers || {}),
    },
  });

  export async function get<T>(params: RequestParams): Promise<T> {
    const response = await fetch(
      buildUrl(params.path),
      buildFetchBody(params, "GET"),
    );

    if (response.status !== HttpStatusCode.OK.valueOf()) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  export async function post<T>(
    params: RequestParamsWithExpectedCode,
  ): Promise<T> {
    const response = await fetch(
      buildUrl(params.path),
      buildFetchBody(params, "POST"),
    );

    if (response.status !== params.expectedCode.valueOf()) {
      throw new Error(response.statusText);
    }

    return response.json();
  }
}
