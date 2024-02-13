const SearchBar = () => {
  return (
    <form className="flex mb-3 md:mb-4">
      <input
        className="w-full px-3 py-[10px] text-base leading-relaxed rounded-none rounded-bl-md rounded-tl-md shadow-md md:text-[18px] md:pl-[18px] dark:bg-slate-800 dark:text-slate-400"
        type="text"
        placeholder="Search City"
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
