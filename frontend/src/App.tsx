import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AuthProvider } from "./context/AuthProvider";
import PublicRoute from "./components/routes/PublicRoute";
import { alertOutline } from "ionicons/icons";
import { useToast } from "./hooks/useToast";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

// Pages
import Home from "./pages/home/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import PasswordRecovery from "./pages/authentication/PasswordRecovery";
import PrivateRoutes from "./components/routes/PrivateRoute";
import AppTabs from "./components/routes/AppTabs";

setupIonicReact();

const App: React.FC = () => {
  const showToast  = useToast();

  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Redirect exact path="/" to="/home" />

            <Route exact path="/home" component={Home} />
            
            <PrivateRoutes exact path="/incomes" component={AppTabs} />
            <PrivateRoutes exact path="/outflows" component={AppTabs} />
            <PrivateRoutes exact path="/categories" component={AppTabs} />
            <PrivateRoutes exact path="/investments" component={AppTabs} />
            <PrivateRoutes exact path="/cryptos" component={AppTabs} />
            <PrivateRoutes exact path="/rewards" component={AppTabs} />

            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/reset-password" component={PasswordRecovery} />

            {/* <Route
              render={() => {
                showToast({
                  color: "warning",
                  message: "Página não encontrada ou não existe",
                  icon: alertOutline,
                });
                return <Redirect path="*" to="/home" />; //FIXME animação de rota
              }}
            /> */}
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};
export default App;
