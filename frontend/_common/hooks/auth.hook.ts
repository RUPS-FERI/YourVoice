"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthService } from "@/_common/services/auth.service";

export const useRedirectIfAuthenticated = (redirectTo = "/") => {
  const router = useRouter();

  useEffect(() => {
    if (AuthService.get.loggedIn) {
      router.push(redirectTo);
    }
    AuthService.get.isUserLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        router.push(redirectTo);
      }
    });
  }, [redirectTo, router]);
};

export const useRedirectIfNotAuthenticated = (redirectTo = "/auth/signin") => {
  const router = useRouter();

  useEffect(() => {
    if (!AuthService.get.loggedIn) {
      router.push(redirectTo);
    }
    AuthService.get.isUserLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        router.push(redirectTo);
      }
    });
  }, [redirectTo, router]);
};
