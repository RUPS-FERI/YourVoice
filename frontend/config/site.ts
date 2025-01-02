import { RouteProtectionType } from "@/utils/RouteProtectionType";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Your Voice",
  description: "Your Voice Description",
  leftNavItems: [
    {
      label: "Home",
      href: "/",
      protected: RouteProtectionType.EVERYONE,
    },
  ],
  rightNavItems: [
    {
      label: "Logout",
      href: "/logout",
      protected: RouteProtectionType.ONLY_AUTHENTICATED,
    },
    {
      label: "Signin",
      href: "/auth/signin",
      protected: RouteProtectionType.ONLY_NON_AUTHENTICATED,
    },
    {
      label: "Signup",
      href: "/auth/signup",
      protected: RouteProtectionType.ONLY_NON_AUTHENTICATED,
    },
  ],
};
