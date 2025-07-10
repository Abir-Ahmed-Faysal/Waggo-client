import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DonationCampaignCard from "./DonationCampaignCard";

const fetchDonationCampaigns = async ({ pageParam = 1 }) => {
  const res = await fetch(`http://localhost:3000/donation?page=${pageParam}&limit=9`);
  if (!res.ok) throw new Error("Error fetching campaigns");
  return res.json();
};

export default function DonationCampaignsPage() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["donationCampaigns"],
    queryFn: ({ pageParam = 1 }) => fetchDonationCampaigns({ pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasMore) return pages.length + 1;
      return undefined;
    },
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const onViewDetails = (campaign) => {
   
    console.log("View details for:", campaign);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6 p-6">
        {[...Array(9)].map((_, idx) => (
          <Skeleton key={idx} height={300} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error loading campaigns: {error.message}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {data.pages.map((page, pageIndex) =>
          page?.campaigns?.map((campaign) => (
            <DonationCampaignCard
              key={campaign._id || `${pageIndex}-${Math.random()}`}
              campaign={campaign}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>

      <div ref={ref} className="h-10 flex justify-center items-center mt-4">
        {isFetchingNextPage && <Skeleton height={30} width={100} />}
        {!hasNextPage && !isFetchingNextPage && (
          <p className="text-gray-500 text-sm">No more campaigns</p>
        )}
      </div>
    </>
  );
}
