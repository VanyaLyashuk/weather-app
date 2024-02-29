import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const Header = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  const onThemeChange = (btn: string): void => {
    if (btn === theme) return;

    setTheme(btn === "light" ? "light" : "dark");
  };

  return (
    <header className="flex justify-start mb-3 md:mb-4">
      <div className="font-medium text-neutral-600 dark:text-slate-400 sm:text-lg">
        <span className=""></span>
        <button
          className={theme === "dark" ? "text-primary" : ""}
          onClick={() => onThemeChange("dark")}
        >
          Dark
        </button>{" "}
        /{" "}
        <button
          className={theme === "light" ? "text-primary" : ""}
          onClick={() => onThemeChange("light")}
        >
          Light
        </button>
      </div>
    </header>
  );
};

export default Header;
