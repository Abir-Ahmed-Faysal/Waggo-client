import React from "react";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useSecureApi from "../../../Hooks/useSecureApi";
import useAuth from "../../../Hooks/useAuth";
import Spinner from "../../../components/Spinner";

const MyHonorDonation = () => {
  const apiPromise = useSecureApi();
  const { user } = useAuth();

  const {
    isPending,
    error,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["my-honor-donation", user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      try {
        const res = await apiPromise(
          `/my-honor-donation?email=${user.email}`
        );
        return res.data || [];
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch donations.");
      }
    },
  });

  const handleRefund = async (donationId) => {
    try {
      const res = await apiPromise.patch(`/donation-refund/${donationId}`, {
        email: user.email,
      });

      if (res.data.modifiedCount || res.data.success) {
        toast.success("Donation refunded successfully!");
        refetch();
      } else {
        toast.error("Refund failed. Try again later.");
      }
    } catch (err) {
      toast.error("Server error during refund.");
      console.error("Refund Error:", err);
    }
  };

  if (isPending) return <Spinner />;

  if (error) {
    return (
      <p className="text-red-500 text-center">
        Error: {error.message || "Something went wrong."}
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">My Donations</h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t donated yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  shadow rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-4">Pet Image</th>
                <th className="py-3 px-4">Pet Name</th>
                <th className="py-3 px-4">Donated Amount</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const myDonation = item.donner.find(
                  (d) => d.email === user.email
                );

                if (!myDonation) return null;

                return (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-4">
                      <img
                        src={item.petImage}
                        alt={item.petName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4">{item.petName}</td>
                    <td className="py-2 px-4">
                      ৳{myDonation.am || myDonation.amount || 0}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleRefund(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Ask for Refund
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyHonorDonation;
