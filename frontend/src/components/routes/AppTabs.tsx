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
import { Route } from "react-router";
import Incomes from "../../pages/incomes/Incomes";
import OutFlow from "../../pages/outflow/Outflow";
import Expenses from "../../pages/expenses/Expenses";
import Investments from "../../pages/investments/Investments";
import HomePage from "../../pages/home/HomePage";
import { IonReactRouter } from "@ionic/react-router";

const AppTabs: React.FC = () => {
  return (
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/incomes" component={Incomes} />
            <Route exact path="/outflow" component={OutFlow} />
            <Route exact path="/expenses" component={Expenses} />
            <Route exact path="/investments" component={Investments} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="entradas" href="/incomes">
              <IonIcon icon={addCircle} />
            </IonTabButton>

            <IonTabButton tab="saídas" href="/outflow">
              <IonIcon icon={removeCircle} />
            </IonTabButton>

            <IonTabButton tab="home" href="/">
              <IonIcon icon={home} />
            </IonTabButton>

            <IonTabButton tab="despesas" href="/expenses">
              <IonIcon icon={bagHandle} />
            </IonTabButton>

            <IonTabButton tab="investimentos" href="/investments">
              <IonIcon icon={trendingUp} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
  );
};

export default AppTabs;
