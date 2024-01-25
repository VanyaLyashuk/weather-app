const SearchBar = () => {
  return (
    <form className="flex ">
      <input
        className="w-full px-3 py-[10px] text-base leading-relaxed rounded-none rounded-bl-md rounded-tl-md shadow-md md:text-[18px]"
        type="text"
        placeholder="Search City"
      />
      <button
        className="px-6 py-2 text-base font-medium leading-normal text-white transition-colors shadow-md bg-neutral-800 rounded-r-md hover:bg-primary focus:bg-primary active:bg-primary md:text-[18px]"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
