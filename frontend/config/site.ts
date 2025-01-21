"use client";

import { RouteProtectionType } from "@/utils/RouteProtectionType";
import { AuthService } from "@/app/_common/services/auth.service";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Your Voice",
  description: "Your Voice Description",
  leftNavItems: [
    {
      label: "Home",
      href: "/",
      action: () => {},
      protected: RouteProtectionType.ONLY_AUTHENTICATED,
    },
    {
      label: "Posts",
      href: "/posts",
      protected: RouteProtectionType.ONLY_AUTHENTICATED,
    },
  ],
  rightNavItems: [
    {
      label: "Logout",
      href: "",
      action: () => AuthService.get.signout(),
      protected: RouteProtectionType.ONLY_AUTHENTICATED,
    },
    {
      label: "Signin",
      href: "/auth/signin",
      action: () => {},
      protected: RouteProtectionType.ONLY_NON_AUTHENTICATED,
    },
    {
      label: "Signup",
      href: "/auth/signup",
      action: () => {},
      protected: RouteProtectionType.ONLY_NON_AUTHENTICATED,
    },
  ],
};
