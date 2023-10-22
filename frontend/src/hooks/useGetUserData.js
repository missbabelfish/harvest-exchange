import { useState, useEffect } from "react";

export const useGetUserData = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      // Retrieve the auth token from localStorage
      const authToken = localStorage.getItem('psg_auth_token');
      console.log(authToken)

      // Make API call to fetch user details using the auth token
      try {
        const response = await fetch("http://localhost:8000/user/getUserProfile", {
            method: "POST", // or 'PUT'
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        // Set the user data in state
        const data = await response.json()
        console.log(data)
        setUserData(data);
      } catch (error) {
        // Handle error if the API call fails
        console.error(error);
      }
    };
    getUserData();
  }, []);

  return userData;
};

export default useGetUserData;

// getCurrentUser - in dependency array