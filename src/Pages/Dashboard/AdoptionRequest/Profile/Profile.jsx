import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";
import { toast } from "react-toastify";
import { LogOut, Edit, UserPlus } from "lucide-react";

const Profile = () => {
  const { user, logOut, updateUser } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const [volunteerData, setVolunteerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  useEffect(() => {
    const storedData = localStorage.getItem("volunteerData");
    if (storedData) {
      setVolunteerData(JSON.parse(storedData));
    }
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    updateUser(displayName, photoURL)
      .then(() => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((err) => {
        toast.error("Failed to update profile: " + err.message);
      });
  };

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
                <span className="font-medium"> Phone:</span> {volunteerData.phone}
              </li>
              <li>
                <span className="font-medium"> Address:</span> {volunteerData.address}
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
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-2 px-5 py-2 w-full sm:w-auto bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition font-medium"
          >
            <Edit size={18} /> Edit Profile
          </button>
          <button
            onClick={() => {
              logOut()
                .then(() => {
                  toast.success("User signed out successfully");
                  navigate("/");
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

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-sm">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Edit Profile
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display Name"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Photo URL"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
