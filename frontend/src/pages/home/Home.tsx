import { useAuth } from "../../context/AuthContext";
import PublicHome from "./PublicHome";
import AuthenticatedHome from "./AuthenticatedHome";

const Home: React.FC = () => {
  const { user } = useAuth();

  return user ? <AuthenticatedHome /> : <PublicHome />;
};

export default Home;
