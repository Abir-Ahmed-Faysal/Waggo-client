import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import useSecureApi from "../../../../Hooks/useSecureApi";
import useAuth from "../../../../Hooks/useAuth";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Overview = () => {
  const secureApi = useSecureApi();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["overview", user.email],
    queryFn: async () => {
      const [petsRes, donationsRes, usersRes] = await Promise.all([
        secureApi.get(`/allPets/admin?email=${user.email}`),
        secureApi.get(`/all-donation/admin?email=${user.email}`),
        secureApi.get(`/user/admin?email=${user.email}`),
      ]);

      return {
        pets: petsRes.data.length,
        donations: donationsRes.data.length,
        users: usersRes.data.length,
      };
    },
  });

  if (isLoading) return <div className="text-gray-800 dark:text-gray-200">Loading Overview...</div>;

  const pieData = [
    { name: "Pets", value: stats.pets },
    { name: "Donations", value: stats.donations },
    { name: "Users", value: stats.users },
  ];

  const barData = [
    { name: "Pets", count: stats.pets },
    { name: "Donations", count: stats.donations },
    { name: "Users", count: stats.users },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col items-center text-gray-800 dark:text-gray-200">
        <h2 className="text-lg font-semibold mb-4">Distribution</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#f9fafb" }} />
          <Legend />
        </PieChart>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 text-gray-800 dark:text-gray-200">
        <h2 className="text-lg font-semibold mb-4">Totals</h2>
        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#f9fafb" }} />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Overview;
