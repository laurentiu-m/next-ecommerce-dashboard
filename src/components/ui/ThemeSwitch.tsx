"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";
import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="w-[70px] h-[35px] relative flex items-center justify-center bg-background border-2 border-surface rounded-2xl cursor-pointer"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <div
        className={`${resolvedTheme === "dark" ? "translate-x-0" : "translate-x-9"} left-0 bg-foreground w-6 h-6 absolute flex items-center justify-center mx-1 rounded-full transition-all transform`}
      >
        {resolvedTheme === "dark" ? (
          <MoonIcon className="size-4 text-background" />
        ) : (
          <SunIcon className="size-4 text-background" />
        )}
      </div>
    </button>
  );
};
