import { useAuth } from "../../context/AuthContext";
import Onboarding from "./Onboarding";
import AppTabs from "../../components/routes/AppTabs";

const Home: React.FC = () => {
  const { user } = useAuth();

  return user ? <AppTabs /> : <Onboarding />;
};

export default Home;
