import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecureApi from "../../../Hooks/useSecureApi";
import useAuth from "../../../Hooks/useAuth";
import AdoptionTable from "./AdoptionTable";

const AdoptionRequest = () => {
  const api = useSecureApi();
  const { user } = useAuth();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["adoptionReq", user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      try {
        const response = await api(`/adoption?email=${user.email}`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  if (isPending) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>something went wrong</div>;
  }
  console.log(data);

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">
        Adoption Requests for Your Pets
      </h2>
      {data.length === 0 ? (
        <p>No adoption requests yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr >
                <th>Pet</th>
                <th>Requester</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <AdoptionTable data={data} api={api} user={user} refetch={refetch} />
          </table>
        </div>
      )}
    </div>
  );
};

export default AdoptionRequest;
