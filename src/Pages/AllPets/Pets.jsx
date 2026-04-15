import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router";
import useDebounce from "../../Hooks/useDebounce";
import Skeleton from "react-loading-skeleton";

const fetchPets = async ({ pageParam = 1, queryKey }) => {
  const [_key, { search, category }] = queryKey;
  const res = await axios.get("https://waggo.vercel.app/pets", {
    params: {
      search,
      category,
      page: pageParam,
      limit: 9,
    },
  });
  return res.data;
};

export default function PetList() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cat } = useParams();
  const value = cat === "all" ? "" : cat;
  const [category, setCategory] = useState(value);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedCategory = useDebounce(category, 500);
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [
      "all-pets",
      { search: debouncedSearch, category: debouncedCategory.toLowerCase() },
    ],
    queryFn: fetchPets,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.hasMore ? allPages.length + 1 : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleClick = (id) => {
    navigate(`/pet/${id}`);
  };

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-danger font-semibold text-lg">Error: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0 max-w-7xl mx-auto">
        {[...Array(9)].map((_, idx) => (
          <Skeleton key={idx} height={300} />
        ))}
      </div>
    );
  }

  const pets = data?.pages.flatMap((page) => page.pets) || [];

  return (
    <div className="px-4 md:px-4 md:pt-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">Find Your Forever Friend</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
          Discover adorable pets looking for a forever home. Browse through dogs, cats, and more—ready to be adopted, loved, and cared for.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search pets by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 p-3 rounded-lg w-full md:w-1/3 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0 outline-none transition-all"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-lg w-full md:w-1/3 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0 outline-none transition-all"
        >
          <option value="">All Categories</option>
          <option value="Dog">🐕 Dog</option>
          <option value="Cat">🐈 Cat</option>
          <option value="Rabbit">🐰 Rabbit</option>
          <option value="Parrot">🦜 Parrot</option>
          <option value="Fish">🐠 Fish</option>
          <option value="Hamster">🐹 Hamster</option>
        </select>
      </div>

      {/* Pet Cards Grid - Professional Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
        {pets.length < 1 && (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No pets found matching your search.</p>
          </div>
        )}
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col hover:scale-105 transform bg-white dark:bg-slate-800"
          >
            {/* Image Container */}
            <div className="overflow-hidden rounded-t-lg h-48">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{pet.name}</h3>
              
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <p><span className="font-semibold">Age:</span> {pet.age}</p>
                <p><span className="font-semibold">Location:</span> {pet.location}</p>
              </div>

              <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                {pet.shortDescription}
              </p>

              {/* Button */}
              <button
                onClick={() => handleClick(pet._id)}
                className="mt-auto px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loader / End Message */}
      <div ref={ref} className="h-10 mt-6 flex items-center justify-center pb-8">
        {isFetchingNextPage && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <span className="text-slate-600 dark:text-slate-400">Loading more pets...</span>
          </div>
        )}
        {!hasNextPage && !isFetchingNextPage && pets.length > 0 && (
          <span className="text-slate-500 dark:text-slate-500 font-medium">✓ All pets loaded</span>
        )}
      </div>
    </div>
  );
}
