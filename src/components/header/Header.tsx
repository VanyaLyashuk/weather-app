import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const Header = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    
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
      <div className="font-medium text-neutral-600 dark:dark-mode-text-color sm:text-lg">
        <span className=""></span>
        <button
          className={`focus-visible-outline rounded-sm ${theme === "dark" ? "text-primary" : ""}`}
          onClick={() => onThemeChange("dark")}
        >
          Dark
        </button>{" "}
        /{" "}
        <button
          className={`focus-visible-outline rounded-sm ${theme === "light" ? "text-primary" : ""}`}
          onClick={() => onThemeChange("light")}
        >
          Light
        </button>
      </div>
    </header>
  );
};

export default Header;
