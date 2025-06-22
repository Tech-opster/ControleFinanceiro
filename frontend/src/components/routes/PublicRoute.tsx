import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const PublicRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={() => (!user ?  <Component /> : <Redirect to="/" />)}
    />
  );
};

export default PublicRoute;
