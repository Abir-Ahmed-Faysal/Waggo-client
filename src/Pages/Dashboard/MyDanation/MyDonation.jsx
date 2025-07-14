import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useSecureApi from "../../../Hooks/useSecureApi";
import Spinner from "../../../components/Spinner";
import DonationTable from "./DonationTable";

const MyDonation = () => {
  const { user } = useAuth();
  const api = useSecureApi(user?.accessToken);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["myPet", user?.email, currentPage],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      const response = await api(
        `/my-campaign?email=${user.email}&page=${currentPage}&limit=${limit}`
      );
      return response.data;
    },
  });

  if (!user?.email || !user?.accessToken || isPending) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message || "Something went wrong"}</div>;
  }

  const { total, campaigns } = data;
  const pageCount = Math.ceil(total / limit);
  const pagination = [...Array(campaigns).keys()];

  console.log(data);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold text-center mb-4">My Donation Campaign</h2>
      <div className="overflow-x-scroll">
        {campaigns.length > 0 ? (
          <DonationTable
            mockData={campaigns}
            email={user.email}
            refetch={refetch}
          />
        ) : (
          <div className="h-screen flex justify-center items-center">
            <h1 className="text-red-500 text-xl">You have no pet added</h1>
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <div className="flex gap-2 mt-4">
          {pagination.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonation;
