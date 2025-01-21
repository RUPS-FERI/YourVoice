import { BehaviorSubject } from "rxjs";

import { ApiRequestService } from "@/app/_common/services/url-builder.service";
import { HttpStatusCode } from "@/utils/HttpStatusCode";

export class AuthService {
  private static instance: AuthService | null = null;
  private isUserLoggedIn = new BehaviorSubject<boolean>(
    localStorage.getItem("JWT_TOKEN") !== null,
  );
  readonly isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  private constructor() {}

  static get get(): AuthService {
    if (this.instance === null) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  get loggedIn() {
    return this.isUserLoggedIn.value;
  }

  async signup(payload: { username: string; password: string; email: string }) {
    await ApiRequestService.post({
      path: ["auth", "signup"],
      expectedCode: HttpStatusCode.CREATED,
      body: payload,
    });
  }

  async signin(payload: { username: string; password: string }) {
    const { token } = await ApiRequestService.post<{ token: string }>({
      path: ["auth", "signin"],
      expectedCode: HttpStatusCode.OK,
      body: payload,
    });

    localStorage.setItem("JWT_TOKEN", `bearer ${token}`);
    this.isUserLoggedIn.next(true);
  }

  signout(): void {
    localStorage.removeItem("JWT_TOKEN");
    this.isUserLoggedIn.next(false);
  }
}
