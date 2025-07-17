import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import useSecureApi from "../../../../Hooks/useSecureApi";
import useAuth from "../../../../Hooks/useAuth";

const AllDonationAdmin = () => {
  const secureApi = useSecureApi();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDonationAdmin", user.email],
    queryFn: async () => {
      const res = await secureApi.get(
        `/all-donation/admin?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleAdoptToggleStatus = async (id, status) => {
    try {
      await secureApi.patch(`/donation-status/admin/${id}`, {
        status: !status,
        email: user.email,
      });
      refetch();
    } catch (error) {
      console.error("Failed to toggle adoption status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this pet?");
      if (!confirmed) return;

      await secureApi.delete(`/donationData?id=${id}&email=${user.email}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete pet:", error);
    }
  };

  if (isLoading) return <div>Loading pets...</div>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">All Donation (Admin)</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th>PetImage</th>
            <th>PetName</th>
            <th>Donated Amount</th>
            <th>Last Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id} className="border-b">
              <td>
                <img
                  src={pet.petImage}
                  alt={pet.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>

              <td>{pet.petName}</td>
              <td>{pet.donatedAmount}</td>
              <td>{pet.lastDate}</td>
              <td>{pet.email}</td>
              <td className={pet.status ? "text-green-600" : "text-red-600"}>
                <button
                  onClick={() => handleAdoptToggleStatus(pet._id, pet.status)}
                  className="btn btn-xs btn-primary"
                >
                  {pet.status ? "active" : "paused"}
                </button>
              </td>

              <td className="flex flex-col gap-2">
                <button
                  className="btn btn-xs btn-warning"
                  onClick={() =>
                    navigate(`/dashboard/admin-pet-update/${pet._id}`)
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pet._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDonationAdmin;
