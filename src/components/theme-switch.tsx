"use client";

import * as React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { useTheme } from "next-themes";
import { SkeletonThemeSwitch } from "./skeletons";

export const SwitchTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <SkeletonThemeSwitch />;

  const handleSwitchTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      onClick={handleSwitchTheme}
      className="peer data-[state=checked]:bg-input data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-7 w-14 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs cursor-pointer transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="bg-background pointer-events-none flex items-center justify-center size-6 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
      >
        {resolvedTheme === "dark" ? (
          <MoonIcon className="size-4" />
        ) : (
          <SunIcon className="size-4" />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
};
