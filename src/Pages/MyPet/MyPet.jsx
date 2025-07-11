import axios from 'axios';
import React from 'react';

const MyPet = () => {

    
    const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["donationCampaigns"],
    queryFn:axios.get})





    return (
        <div>
            thsi si my pet
        </div>
    );
};

export default MyPet;