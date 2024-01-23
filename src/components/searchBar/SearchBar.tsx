const SearchBar = () => {
  return (
    <form className="flex drop-shadow-md">
      <input
        className="w-full px-3 py-[10px] text-base leading-relaxed border rounded-none rounded-bl-md rounded-tl-md"
        type="text"
        placeholder="Search City"
      />
      <button
        className="px-6 py-2 text-base font-medium leading-normal text-white transition-colors bg-neutral-800 rounded-r-md hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-600"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
