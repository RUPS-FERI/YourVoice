"use client";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { RouteProtectionType } from "@/utils/RouteProtectionType";
import { AuthService } from "@/_common/services/auth.service";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(AuthService.get.loggedIn);
    AuthService.get.isUserLoggedIn$.subscribe((isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    });
  });

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit nav-title">Your Voice</p>
          </Link>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.leftNavItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.rightNavItems
            .filter(
              (item) =>
                item.protected === RouteProtectionType.ONLY_NON_AUTHENTICATED &&
                !isLoggedIn,
            )
            .map((item) => (
              <NavbarItem key={item.href}>
                <Button as={Link} color={"primary"} href={item.href}>
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          {siteConfig.rightNavItems
            .filter(
              (item) =>
                item.protected === RouteProtectionType.ONLY_AUTHENTICATED &&
                isLoggedIn,
            )
            .map((item) => (
              <NavbarItem key={item.href}>
                <Button
                  as={Link}
                  color={"primary"}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    item.action();
                  }}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          {siteConfig.rightNavItems
            .filter((item) => item.protected === RouteProtectionType.EVERYONE)
            .map((item) => (
              <NavbarItem key={item.href}>
                <Button as={Link} color={"primary"} href={item.href}>
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
        </ul>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
