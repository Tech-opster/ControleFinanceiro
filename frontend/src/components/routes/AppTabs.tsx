import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  addCircle,
  bagHandle,
  home,
  removeCircle,
  trendingUp,
} from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "../../pages/home/HomePage";
import Incomes from "../../pages/incomes/Incomes";
import OutFlow from "../../pages/outflow/Outflow";
import Expenses from "../../pages/expenses/Expenses";
import Investments from "../../pages/investments/Investments";

const AppTabs: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home"/>

          <Route exact path="/home" render={() => <HomePage />} />
          <Route exact path="/incomes" render={() => <Incomes />} />
          <Route exact path="/outflow" render={() => <OutFlow />} />
          <Route exact path="/expenses" render={() => <Expenses />} />
          <Route exact path="/investments" render={() => <Investments />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="incomes" href="/incomes">
            <IonIcon icon={addCircle} />
          </IonTabButton>

          <IonTabButton tab="outflow" href="/outflow">
            <IonIcon icon={removeCircle} />
          </IonTabButton>

          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
          </IonTabButton>

          <IonTabButton tab="expenses" href="/expenses">
            <IonIcon icon={bagHandle} />
          </IonTabButton>

          <IonTabButton tab="investments" href="/investments">
            <IonIcon icon={trendingUp} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default AppTabs;
