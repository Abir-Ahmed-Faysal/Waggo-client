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
      <div className="p-8 text-center text-red-600 font-semibold">
        Error: {error.message}
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
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Find your Forever Friend</h1>
        <p className="text-sm sm:text-base mt-2">
          Discover adorable pets looking for a forever home. Browse through dogs, cats, and more—ready to be adopted, loved, and cared for.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search pets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Parrot">Parrot</option>
          <option value="Fish">Fish</option>
          <option value="Hamster">Hamster</option>
        </select>
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.length < 1 && <div className="col-span-full text-center">No data found</div>}
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="border p-4 rounded shadow flex flex-col overflow-hidden"
          >
            <div className="overflow-hidden rounded">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full aspect-[4/3] object-cover rounded"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-2">{pet.name}</h3>
            <p className="text-sm sm:text-base">Age: {pet.age}</p>
            <p className="line-clamp-1 text-sm sm:text-base">Location: {pet.location}</p>
            <p className="line-clamp-2 text-sm sm:text-base">
              Description: <br /> {pet.shortDescription}
            </p>
            <button
              onClick={() => handleClick(pet._id)}
              className="mt-2 text-blue-500 text-sm sm:text-base"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Loader / End Message */}
      <div ref={ref} className="h-10 mt-6 flex items-center justify-center">
        {isFetchingNextPage && <span>Loading more pets...</span>}
        {!hasNextPage && !isFetchingNextPage && pets.length > 0 && (
          <span className="text-gray-500">No more pets to load.</span>
        )}
      </div>
    </div>
  );
}
