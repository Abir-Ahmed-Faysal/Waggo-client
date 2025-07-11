import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import useSecureApi from "../../Hooks/useSecureApi";

const MyPet = () => {
  const { user } = useAuth();
  const api = useSecureApi(user?.accessToken);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const { isPending, error, data } = useQuery({
    queryKey: ["myPet", user?.email, currentPage],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      const response = await api(
        `/my-pet?email=${user.email}&page=${currentPage}&limit=${limit}`
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

  const { total, pets } = data;
  const pageCount = Math.ceil(total / limit);
  const pagination = [...Array(pageCount).keys()];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Pet Data</h2>

      <pre className="bg-gray-100 p-4 rounded mb-4">
        {JSON.stringify(pets, null, 2)}
      </pre>

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

export default MyPet;
