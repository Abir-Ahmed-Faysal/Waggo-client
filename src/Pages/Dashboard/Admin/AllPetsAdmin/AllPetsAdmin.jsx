import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../../../../Hooks/useSecureApi";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router";

const AllPetsAdmin = () => {
  const secureApi = useSecureApi();
  const { user } = useAuth();
  const navigate=useNavigate()

  const { data: pets = [], isLoading, refetch } = useQuery({
    queryKey: ["allPetsAdmin"],
    queryFn: async () => {
      const res = await secureApi.get(`/allPets/admin?email=${user.email}`);
      return res.data;
    },
  });

  const handleAdoptToggle = async (id, adopted) => {
    try {
      await secureApi.patch(`/pet-status/admin/${id}`, { adopted: !adopted,email:user.email });
      refetch();
    } catch (error) {
      console.error("Failed to toggle adoption status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this pet?");
      if (!confirmed) return;

      await secureApi.delete(`/pets?id=${id}&email=${user.email}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete pet:", error);
    }
  };

  if (isLoading) return <div>Loading pets...</div>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">All Pets (Admin)</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Age</th>
            <th>Location</th>
            <th>Posted By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id} className="border-b">
              <td>
                <img src={pet.image} alt={pet.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td>{pet.name}</td>
              <td>{pet.category}</td>
              <td>{pet.age}</td>
              <td>{pet.location}</td>
              <td>{pet.email}</td>
              <td className={pet.adopted ? "text-green-600" : "text-red-600"}>
                {pet.adopted ? "Adopted" : "Not Adopted"}
              </td>
              <td className="flex flex-col gap-2">
                <button
                  onClick={() => handleAdoptToggle(pet._id, pet.adopted)}
                  className="btn btn-xs btn-primary"
                >
                  {pet.adopted ? "Mark Not Adopted" : "Mark Adopted"}
                </button>
                <button
                  className="btn btn-xs btn-warning"
                  onClick={() => navigate(`/dashboard/admin-pet-update/${pet._id}`)}
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

export default AllPetsAdmin;
