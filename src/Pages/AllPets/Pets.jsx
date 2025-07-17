import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import {  useNavigate, useParams } from 'react-router';
import useDebounce from '../../Hooks/useDebounce';

const fetchPets = async ({ pageParam = 1, queryKey }) => {

  const [_key, { search, category }] = queryKey;
  const res = await axios.get('https://waggo.vercel.app/pets', {
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
  const [search, setSearch] = useState('');
  const navigate=useNavigate()
  const{cat}=useParams()
  const value=cat==='all'?'':cat
  const [category, setCategory] = useState(value);

  // Debounced values
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
    queryKey: ['pets', { search: debouncedSearch, category: debouncedCategory.toLowerCase() }],
    queryFn: fetchPets,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.hasMore ? allPages.length + 1 : undefined,
  });

  // Auto-fetch next page when bottom in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

const handleClick=(id)=>{
 navigate(`/pet/${id}`)
}

  // Optional: error handling
  if (isError) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Error: {error.message}
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="p-8 text-center text-lg font-semibold">Loading...</div>
    );
  }

  const pets = data?.pages.flatMap((page) => page.pets) || [];

  return (
    <div className="p-4">
      {/* Search & Filter */}
      <div className="mb-4 flex flex-col md:flex-row gap-2">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet._id} className="border p-4 rounded shadow">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-2">{pet.name}</h3>
            <p>Age: {pet.age}</p>
            <p>Location: {pet.location}</p>
            <button onClick={
             ()=>handleClick(pet._id) } className="mt-2 text-blue-500 ">
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
