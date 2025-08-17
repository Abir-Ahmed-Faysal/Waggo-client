import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";
import { toast } from "react-toastify";
import { LogOut, Edit, UserPlus } from "lucide-react";

const Profile = () => {
  const { user, logOut } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const [volunteerData, setVolunteerData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("volunteerData");
    if (storedData) {
      setVolunteerData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center transition-all duration-300 hover:scale-[1.01]">
        
        {/* Profile Image */}
        <div className="relative flex justify-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover shadow-md"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
          {user?.displayName || "Anonymous User"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {user?.email}
        </p>
        <span className="mt-3 inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
          {role ? `Role: ${role}` : "User"}
        </span>

        {/* Volunteer Section */}
        {volunteerData ? (
          <div className="mt-6 p-5 border border-green-300 bg-green-50 dark:bg-green-900 rounded-xl text-left shadow-sm">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
              ✅ Volunteer Information
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-medium">📞 Phone:</span> {volunteerData.phone}
              </li>
              <li>
                <span className="font-medium">📍 Address:</span> {volunteerData.address}
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => navigate("/join-us")}
            className="mt-6 flex items-center justify-center gap-2 px-5 py-2 w-full bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition font-medium"
          >
            <UserPlus size={18} /> Become a Volunteer
          </button>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <button className="flex items-center justify-center gap-2 px-5 py-2 w-full sm:w-auto bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition font-medium">
            <Edit size={18} /> Edit Profile
          </button>
          <button
            onClick={() => {
              logOut()
                .then(() => {
                  toast.success("User signed out successfully");
                })
                .catch((error) => {
                  console.error("Logout error:", error);
                });
            }}
            className="flex items-center justify-center gap-2 px-5 py-2 w-full sm:w-auto bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
