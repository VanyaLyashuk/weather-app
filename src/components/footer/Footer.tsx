const Footer = () => {
  return (
    <footer className="p-8 mt-auto text-center sm:text-lg dark:dark-mode-text-color">
      © 2024. All rights reserved.{" "}
      <span className="whitespace-nowrap">
        Coded by{" "}
        <a
          className="underline rounded-sm focus-visible-outline"
          href="https://www.linkedin.com/in/ivan-lyashuk/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Ivan Lyashuk
        </a>
      </span>
    </footer>
  );
};

export default Footer;
