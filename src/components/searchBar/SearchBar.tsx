const SearchBar = () => {
  return (
    <form className="flex drop-shadow-md">
      <input
        className="w-full p-2 px-3 text-sm border rounded-l-md sm:text-base"
        type="text"
        placeholder="Search City"
      />
      <button
        className="px-6 py-2 text-sm font-medium leading-normal text-white transition-colors bg-neutral-800 rounded-r-md sm:text-base hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-600"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
