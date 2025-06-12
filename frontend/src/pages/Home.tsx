import { useAuth } from "../context/AuthContext";
import "./Home.css";
import PublicHome from "./publicHome/PublicHome";
import AuthenticatedHome from "./authenticatedHome/AuthenticatedHome";

const Home: React.FC = () => {
  const { user } = useAuth();

  return user ? <AuthenticatedHome /> : <PublicHome />;
};

export default Home;
