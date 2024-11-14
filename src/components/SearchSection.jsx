function SearchSection() {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mx-auto mt-8 w-3/4 md:w-1/2">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search keyword"
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto flex-grow"
        />
        <input
          type="text"
          placeholder="Location"
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto flex-grow"
        />
        <input
          type="text"
          placeholder="Category"
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto flex-grow"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Find Job</button>
      </div>
    </div>
  );
}

export default SearchSection;
