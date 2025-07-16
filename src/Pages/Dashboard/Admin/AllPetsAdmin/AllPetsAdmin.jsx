import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../../../../Hooks/useSecureApi";


const AllPetsAdmin = () => {
  const secureApi = useSecureApi();

  const { data: pets = [], isLoading, refetch } = useQuery({
    queryKey: ["allPetsAdmin"],
    queryFn: async () => {
      const res = await secureApi.get("/admin/pets");
      return res.data;
    }
  });

  const handleAdoptToggle = async (id, adopted) => {
    await secureApi.patch(`/admin/pets/${id}`, { adopted: !adopted });
    refetch();
  };

  const handleDelete = async (id) => {
    await secureApi.delete(`/admin/pets/${id}`);
    refetch();
  };

  if (isLoading) return <div>Loading pets...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Pets (Admin)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map(pet => (
          <div key={pet._id} className="p-4 shadow rounded bg-white">
            <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover" />
            <h3 className="font-bold text-lg">{pet.name}</h3>
            <p>Category: {pet.category}</p>
            <p>Status: {pet.adopted ? "Adopted" : "Not Adopted"}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleAdoptToggle(pet._id, pet.adopted)} className="btn btn-sm">
                {pet.adopted ? "Mark Not Adopted" : "Mark Adopted"}
              </button>
              <button onClick={() => handleDelete(pet._id)} className="btn btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPetsAdmin;
