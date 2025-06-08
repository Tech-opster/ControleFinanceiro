// components/PrivateRoute.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // ou um loading spinner

  return (
    <Route
      {...rest}
      render={() =>
        user ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

