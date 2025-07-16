import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../../../../Hooks/useSecureApi";


const AllUsers = () => {
  const secureApi = useSecureApi();


  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsersAdmin"],
    queryFn: async () => {
      const res = await secureApi.get("/admin/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    await secureApi.patch(`/admin/users/${id}`, { role: "admin" });
    refetch();
  };

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
