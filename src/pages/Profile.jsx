import React, { useState, useEffect } from "react";
import client from "../api/client";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await client.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the user data is in response.data
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={() => setLoading(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-10">No user data available.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        User Profile
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <p className="text-xl font-semibold text-gray-700 mb-4">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-xl font-semibold text-gray-700 mb-4">
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}

export default Profile;
