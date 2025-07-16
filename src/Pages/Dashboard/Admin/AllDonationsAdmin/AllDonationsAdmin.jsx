import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../../../../Hooks/useSecureApi";


const AllDonationsAdmin = () => {
  const secureApi = useSecureApi();


  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ["allDonationsAdmin"],
    queryFn: async () => {
      const res = await secureApi.get("/admin/donations");
      return res.data;
    }
  });

  const handlePauseToggle = async (id, paused) => {
    await secureApi.patch(`/admin/donations/${id}`, { paused: !paused });
    refetch();
  };

  const handleDelete = async (id) => {
    await secureApi.delete(`/admin/donations/${id}`);
    refetch();
  };

  if (isLoading) return <div>Loading donations...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Donation Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map(d => (
          <div key={d._id} className="p-4 shadow rounded bg-white">
            <img src={d.image} alt={d.petName} className="w-full h-40 object-cover" />
            <h3 className="font-bold text-lg">{d.petName}</h3>
            <p>Max: ${d.maxAmount}</p>
            <p>Donated: ${d.donatedAmount}</p>
            <p>Status: {d.paused ? "Paused" : "Active"}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handlePauseToggle(d._id, d.paused)} className="btn btn-sm">
                {d.paused ? "Unpause" : "Pause"}
              </button>
              <button onClick={() => handleDelete(d._id)} className="btn btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonationsAdmin;
