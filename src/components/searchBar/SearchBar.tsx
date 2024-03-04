import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log(search);
  };

  return (
    <form className="flex mb-3 md:mb-4" onSubmit={handleSubmit}>
      <input
        className="w-full px-3 py-[10px] text-base leading-relaxed rounded-none rounded-bl-md rounded-tl-md shadow-md sm:text-lg md:pl-[18px] dark:bg-slate-800 dark:text-slate-400"
        type="text"
        onChange={handleSearchChange}
        placeholder="Search City"
        value={search}
      />
      <button
        className="px-6 py-2 text-base font-medium leading-normal text-white transition-colors shadow-md bg-neutral-800 rounded-r-md hover:bg-primary focus:bg-primary active:bg-primary md:text-[18px] dark:bg-slate-400 dark:hover:bg-primary dark:focus:bg-primary dark:active:bg-primary dark:text-slate-800 dark:hover:text-white"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
