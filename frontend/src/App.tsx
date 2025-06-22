import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { alertOutline } from "ionicons/icons";
import { AuthProvider } from "./context/AuthProvider";
import PublicRoute from "./components/routes/PublicRoute";

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
import passwordRecovery from "./pages/authentication/PasswordRecovery";

setupIonicReact();

const App: React.FC = () => {
  const [present] = useIonToast();

  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" component={Home} />

            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute
              exact
              path="/reset-password"
              component={passwordRecovery}
            />

            <Route
              render={() => {
                present({
                  cssClass: "custom-toast ion-text-center",
                  color: "warning",
                  position: "top",
                  positionAnchor: "header",
                  message: "Página não encontrada ou não existe",
                  icon: alertOutline,
                  duration: 3000,
                });
                return <Redirect to="/" />;
              }}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};
export default App;
