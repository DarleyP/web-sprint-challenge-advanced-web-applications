// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       component={(props) =>
//         localStorage.getItem("token") ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/" />
//         )
//       }
//     />
//   );
// };


// export default PrivateRoute;