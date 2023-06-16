// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Route, Navigate } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user")) || null;
//     if (savedUser) {
//       axios
//         .get(`https://safran.onrender.com/users/${savedUser.id}`)
//         .then((result) => {
//           setIsAuthenticated(result.data.isAdmin);
//         });
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return (
//     <Route
//       {...rest}
//       children={isAuthenticated ? <Component /> : <Navigate to="/" replace />}
//     />
//   );
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || null;
    async function getUser() {
      try {
        const response = await axios.get(
          `https://safran.onrender.com/users/${savedUser.id}`
        );
        const user = response.data;
        setIsAuthenticated(user.isAdmin);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (savedUser) {
      getUser();
    }
  }, []);

  console.log(isAuthenticated);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}
